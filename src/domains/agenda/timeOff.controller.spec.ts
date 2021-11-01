import { Test, TestingModule } from '@nestjs/testing'
import { TimeOffController } from './timeOff.controller'
import { TimeOffService } from './timeOff.service'

describe('TimeOffController', () => {
  let controller: TimeOffController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOffController],
      providers: [TimeOffService],
    }).compile()

    controller = module.get<TimeOffController>(TimeOffController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
