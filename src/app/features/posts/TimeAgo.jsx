import { parseISO, formatDistanceToNow } from "date-fns"
const TimeAgo = ({ timeStamp }) => {
  let timeago = ""
  if (timeStamp) {
    const date = parseISO(timeStamp)
    const timePeriod = formatDistanceToNow(date)
    timeago = `${timePeriod} ago`
  }
  return <span title={timeStamp}>&nbsp;{timeago}</span>
}

export default TimeAgo
