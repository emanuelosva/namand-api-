import { Injectable, NotFoundException } from '@nestjs/common'
import { Types } from 'mongoose'
import { SLOT_SIZE, DEFAULT_TIME_FOR_BOOKING } from '@namand/constants'
import { InjectModel } from '@namand/providers'
import { MongooseModel } from '@namand/interfaces'
import { mapDayNameWithDayNumber } from '@namand/utils'
import {
  CreateAgendaDto,
  CreateBreakDto,
  UpdateAgendaDto,
  UpdateDayPlanDto,
  UpdateBreakDto,
} from './dto'
import { Agenda } from './entities'

@Injectable()
export class AgendaService {
  constructor(
    @InjectModel(Agenda)
    private readonly agendaModel: MongooseModel<Agenda>,
  ) {}

  create(createAgendaDto: CreateAgendaDto) {
    return this.agendaModel.create(createAgendaDto)
  }

  async addBreak(
    id: string,
    {
      createBreakDto,
      dayNumber,
    }: { createBreakDto: CreateBreakDto; dayNumber: number },
  ) {
    const updatedAgenda = await this.agendaModel.findOneAndUpdate(
      {
        _id: id,
        'workingPlan.dayNumber': dayNumber,
      },
      { $push: { 'workingPlan.$.breaks': createBreakDto } },
      { new: true, fields: 'workingPlan' },
    )

    return updatedAgenda.workingPlan.find(this.isDayNumber(dayNumber)).breaks
  }

  buildDefaultAgenda(staff: Types.ObjectId, timezone: string) {
    return {
      staff,
      timezone,
      slotSize: SLOT_SIZE,
      timeForBooking: DEFAULT_TIME_FOR_BOOKING,
      workingPlan: Array.from(Array(7).keys(), this.generateDayPlan),
    }
  }

  async findByStaffId(staffId: string) {
    const agenda = await this.agendaModel.findOne({ staffId }).lean()
    if (!agenda) throw new NotFoundException('Agenda not found')
    return agenda
  }

  async findById(id: string) {
    const agenda = await this.agendaModel.findById(id).lean()
    if (!agenda) throw new NotFoundException('Agenda not found')
    return agenda
  }

  async update(id: string, updateAgendaDto: UpdateAgendaDto) {
    const agenda = await this.agendaModel
      .findByIdAndUpdate(id, updateAgendaDto, {
        new: true,
        fields: '-workingPlan',
      })
      .lean()

    if (!agenda) throw new NotFoundException('Agenda not found')
    return agenda
  }

  async updateDayPlan(
    id: string,
    {
      updateDayPlanDto,
      dayNumber,
    }: { updateDayPlanDto: UpdateDayPlanDto; dayNumber: number },
  ) {
    const agenda = await this.agendaModel
      .findOneAndUpdate(
        { _id: id, 'workingPlan.dayNumber': dayNumber },
        this.buiildUpdateArrayQuery('workingPlan', updateDayPlanDto),
        { new: true, fields: 'workingPlan' },
      )
      .lean()

    if (!agenda) throw new NotFoundException('Agenda not found')
    return agenda.workingPlan.find(this.isDayNumber(dayNumber))
  }

  async updateBreak(
    id: string,
    {
      updateBreakDto,
      dayNumber,
      uid,
    }: { updateBreakDto: UpdateBreakDto; dayNumber: number; uid: string },
  ) {
    const agenda = await this.agendaModel.findById(id, 'workingPlan').lean()
    if (!agenda) throw new NotFoundException('Agenda not found')

    const day = agenda.workingPlan.find(this.isDayNumber(dayNumber))
    const foundBreak = day?.breaks.find((bk) => bk.uid === uid)
    if (!foundBreak) throw new NotFoundException('Break not found')

    const breakToUpdate = {
      ...foundBreak,
      ...updateBreakDto,
      updatedAt: new Date(),
    }
    const breakIndex = day?.breaks.findIndex((bk) => bk.uid === uid)
    const updatedAgenda = await this.agendaModel.findOneAndUpdate(
      {
        _id: id,
        'workingPlan.dayNumber': dayNumber,
      },
      { [`workingPlan.$.breaks.${breakIndex}`]: breakToUpdate },
      { new: true, fields: 'workingPlan' },
    )

    return updatedAgenda.workingPlan.find(this.isDayNumber(dayNumber)).breaks
  }

  async remove(id: number) {
    await this.agendaModel.deleteOne({ _id: id })
  }

  async removeBreak(
    id: string,
    { dayNumber, uid }: { dayNumber: number; uid: string },
  ) {
    const agenda = await this.agendaModel.findById(id, 'workingPlan').lean()
    if (!agenda) throw new NotFoundException('Agenda not found')

    const updatedAgenda = await this.agendaModel.findOneAndUpdate(
      {
        _id: id,
        'workingPlan.dayNumber': dayNumber,
      },
      { $pull: { 'workingPlan.$.breaks': { uid } } },
      { new: true, fields: 'workingPlan' },
    )

    return updatedAgenda.workingPlan.find(this.isDayNumber(dayNumber)).breaks
  }

  private isDayNumber(dayNumberToFind: number) {
    return ({ dayNumber }) => dayNumber === dayNumberToFind
  }

  private generateDayPlan(_, index: number) {
    return {
      dayName: mapDayNameWithDayNumber(index),
      dayNumber: index,
      active: false,
      startTime: '09:00',
      endTime: '15:00',
      breaks: [],
    }
  }

  private buiildUpdateArrayQuery(field: string, toUpdate: Record<string, any>) {
    const entries = Object.entries(toUpdate)

    const query = {}
    entries.forEach((entrie) => {
      query[`${field}.$.${entrie[0]}`] = entrie[1]
    })

    return query
  }
}
