import React, { useState } from 'react'
import { Rate } from 'antd'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { updateRating } from 'api/client/productClient.api'
import { toast } from 'react-toastify'

export default function RatingStars({ productGroupId, rate }: { productGroupId: number; rate: number }) {
  const user = useSelector((state: RootState) => state.orderClient.user)
  const [check, setCheck] = useState(false)
  const dispatch = useAppDispatch()
  const handleRating = (value: any) => {
    if (rate > 0) {
      toast.warning('The product has been previously reviewed!', {
        position: toast.POSITION.TOP_RIGHT
      })
      return
    }
    dispatch(updateRating({ userId: user.id, rate: value, productGroupId: productGroupId }))
    toast.success('The product has been evaluated successfully', {
      position: toast.POSITION.TOP_RIGHT
    })
    setCheck(true)
  }

  return <Rate allowHalf disabled={check} defaultValue={rate} onChange={handleRating} />
}
