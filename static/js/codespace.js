const Code = {
  delimiters: ['[[', ']]'],
  data() {
    return {
      description: '',
      numbers: [1, 2],
      code: ''
    }
  },
  computed: {
    rows() {
       return `height: 1em * ${this.numbers.length}`
    }
  },
  watch: {
    description(value) {
      console.log(value.split('\n'))
      console.log(this.numbers)

      if(value.split('\n').length > 2) {
        let newNumbers = [1]
        for (let i = 1; i < value.split('\n').length; i++) {
          newNumbers.push(i+1)
        }
        this.numbers = newNumbers
      } else {
        return
      }

    }
  }
}

Vue.createApp(Code).mount('#app')