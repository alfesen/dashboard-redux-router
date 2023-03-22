import s from './Loading.module.scss'

const Loading = ({dark}: {dark?: boolean}) => {
  return (
    <div className={`${s.loading} ${dark ? s.dark : ''}`}>Loading...</div>
  )
}

export default Loading