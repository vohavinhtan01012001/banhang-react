import React, { useState } from 'react'
import { Rate } from 'antd'

export default function RatingStartsShow({ rate }: { rate: number }) {
  return <Rate allowHalf disabled defaultValue={rate} />
}
