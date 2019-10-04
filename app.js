 

    const imgOfDay = document.getElementById("imgOfDay")
    const imgOfDay_HD = document.getElementById("imgOfDay_HD")
    const textOfDay = document.getElementById("textOfDay_one")

    const copyright = document.getElementById("copyright")
    const date = document.getElementById("date") 








    fetch("https://api.nasa.gov/planetary/apod?api_key=vp0e7z1FZsaGJHfRQ7qFp6gA4IZK2AVPh4TsvfKq")
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
    })
    .then((data) => { 
         copyright.innerText = data.copyright;
        date.innerText = data.date;
        imgOfDay.src = data.url;
        imgOfDay_HD.src = data.hdurl;
        textOfDay.innerText = ""
        textOfDay.innerText = data.explanation
    })
/*  the json file is not returning enough data to be able to work. (at the time of developing this site) May be update in future
    fetch("https://api.nasa.gov/insight_weather/?api_key=vp0e7z1FZsaGJHfRQ7qFp6gA4IZK2AVPh4TsvfKq&feedtype=json&ver=1.0")
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
    })
    .then((data) => { 
        console.log(data) 
    })

*/

 //// text animation 


 
class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '!<>-_\\/[]{}—=+*^?#________'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  // ——————————————————————————————————————————————————
  // Example
  // ——————————————————————————————————————————————————
  
  const phrases = [
    'hover...',
    'hover the planet',
    'you\'ll see cool things ',
    'just hover the planet',
    'aliens', 
    'or humans...', 
  ]
  
  const el = document.querySelector('.text')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 800)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()