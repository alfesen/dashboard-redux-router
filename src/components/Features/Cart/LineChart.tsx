import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Product } from '../../../types'
import s from './Chart.module.scss'

const LineChart = ({ products }: { products: Product[] }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Discount comparison',
      },
    },
  }

  const [data, setData] = useState<{ labels: any; datasets: any }>({
    labels: [],
    datasets: [{}, {}],
  })

  useEffect(() => {
    setData({
      labels: products.map((p: Product) => 'Product ' + p.id.toString()),
      datasets: [
        {
          label: 'Price',
          data: products.map((p: Product) => p.price),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Discounted Price',
          data: products.map((p: Product) => p.discountedPrice / p.quantity!),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  }, [products])

  return (
    <div className={s.chart}>
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart
