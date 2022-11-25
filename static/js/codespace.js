const instance = axios.create({
    baseURL: '../api/v1/docs/',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.getCookies('csrftoken')
})


console.log(Cookies.getCookies('csrftoken'))


const Code = {
    delimiters: ['[[', ']]'],
    data() {
        return {
            description: '',
            numbers: [1],
            code: '',

            isLoading: false,
            loadingTime: 15
        }
    },
    methods: {
        submitDescription(e) {
            e.preventDefault()
            //
            this.isLoading = true
            this.startLoader()
            console.log('Отправленное описание', this.description)

            this.loadCode(this.description)

            //
            this.description = ''
        },
        async loadCode(description) {
            let newId = ''
            await instance.post('copilot/', {
                "textarea_old": description,
                "textarea_new": ""
            }).then(({data}) => {
                newId = data.id
            })

            console.log(newId)

            let newCode = ''

            setTimeout(() => {
                console.log('итерация')
                instance.get(`copilot/${newId}/`).then(({data}) => {
                    newCode = data.textarea_new
                    console.log('Преобразованный код', newCode)
                    this.setCode(newCode)

                    this.isLoading = false

                }, () => {
                    this.isLoading = false
                })
            }, 15000)

            return

        },
        setCode(code) {
            this.code = code
        },

        startLoader() {
            let loaderId = setInterval(() => {
                this.loadingTime--
            }, 1000)

            setTimeout(() => {
                clearInterval(loaderId)
                this.loadingTime = 15
            }, 15000)
        }
    },
    computed: {},
    watch: {
        code(value) {
            let newNumbers = [1]
            for (let i = 1; i < value.split('\n').length; i++) {
                newNumbers.push(i + 1)
            }
            this.numbers = newNumbers
        }
    }
}

Vue.createApp(Code).mount('#app')