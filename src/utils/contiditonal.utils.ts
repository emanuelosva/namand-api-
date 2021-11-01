export const conditionally =
  <Props, Result>(options: {
    if: boolean | ((props: Props) => any)
    then: (props: Props) => Result
    else: (props: Props) => Result
  }) =>
  (props: Props) => {
    const isConditionTrhuth =
      typeof options.if === 'function' ? options.if(props) : options.if

    return isConditionTrhuth ? options.then(props) : options.else(props)
  }
