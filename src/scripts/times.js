import { DateTime } from "luxon";

const clock = document.querySelector('.clock')

const updateTime = () => {
  const now = DateTime.now().setZone("Europe/Berlin")
  const output = document.querySelector('.time')
  output.innerText = now.toFormat('HH:mm:ss')

  const hour = parseInt(now.toFormat('H'))
  if (hour >= 9 && hour < 18) {
  clock.classList.add('open')
  }
}

updateTime()

setInterval(updateTime, 1000)
