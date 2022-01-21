document.querySelectorAll('span.delete')
    .forEach(btn => btn.addEventListener('click', processDelete))

    
async function processDelete(e) {
    const token = document.querySelector('#jokes').token

    const jokeId = this.id.replace('delete-', '')
    const uri = `/api/jokes/${jokeId}`
    console.log(uri)

    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'DELETE'

    }
    const rsp = await fetch(uri, options)
    if(rsp.status == 200) {
        //location.reload()
        const divJoke = document.querySelector(`#joke-${jokeId}`)
        divJoke.parentElement.removeChild(divJoke)
    }
}
