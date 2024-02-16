import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/frontend/css/grid.css'
import CurrencyFormatter from 'component/currencyFormatter'
import Img from '../../assets/frontend/img/detail/lss.png'
import { Product } from 'types/product.type'
import RatingStartsShow from 'component/evaluate/RatingStartsShow'
interface PropsProduct {
  data: Product
  index: number
}

export default function ProductItem({ data, index }: PropsProduct) {
  const history = useNavigate()
  const handleClick = () => {
    history(`/${data.Category?.name}/${data.id}`)
  }
  return (
    <div key={index} /*  className='col-lg-3 col-md-4 col-sm-4 col-xs-6' */>
      <div className='content__product' style={{ height: '95%' }}>
        <div onClick={handleClick} className='content__product-item'>
          <img src={`${data.image}`} className='content__product-img'></img>
          {data.quantity === 0 ? <img src={Img} className='content__product-img2'></img> : ''}
          <p
            className='content__product-text'
            style={{ fontSize: '13px', margin: '20px 10px 0 10px', color: '#ab7676' }}
          >
            Số lượt thích:
            {data.favourite}
          </p>
          <p className='content__product-text' style={{ fontSize: '13px', margin: '0 10px', color: '#ab7676' }}>
            Số lượt bán:
            {data.sales}
          </p>
        </div>
        <div className='content-product-item2'>
          <div className='content__product-text2 text-sm text-slate-500'>{data.Category?.name}</div>
          <div className='content__product-text2 text-lg text-gray-700'>{data.name}</div>
          <div className='content__product-evaluate'>
            <RatingStartsShow rate={data.evaluate} />
          </div>
          {data.quantity === 0 ? (
            <div className='content__product-price--item1 error'>
              <p style={{ fontSize: '13px', fontWeight: 'bold' }}>Hết hàng</p>
            </div>
          ) : (
            <div className='content__product-price'>
              <div className='content__product-price--item1'>{CurrencyFormatter(data.priceReduced)}</div>
              {data.Promotion?.status === 1 ? (
                <del className='content__product-price--item2'>{CurrencyFormatter(data.price)}</del>
              ) : (
                ''
              )}
            </div>
          )}
          {data.Promotion?.status === 1 ? (
            <div className='content__product-sale'>{'-' + data.Promotion.discount + '%'}</div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
