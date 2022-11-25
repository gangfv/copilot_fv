const instance = axios.create({
    baseURL: '../api/v1/',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.getCookies('csrftoken')
})



const Code = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            description: '',
            numbers: [1],
            code: ''
        }
    },
    methods: {
        submitDescription(e) {
            e.preventDefault()
            //
            console.log(this.description)
            //
            this.description = ''
        },
        setCode(code) {
            this.code = code
        }
    },
    computed: {},
    watch: {
        description(value) {
            let newNumbers = [1]
            for (let i = 1; i < value.split('\n').length; i++) {
                newNumbers.push(i + 1)
            }
            this.numbers = newNumbers
        }
    }
}

Vue.createApp(Code).mount('#app')