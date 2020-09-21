
var trash = document.getElementsByClassName("fa-trash")
let drop = document.getElementsByClassName('fa-tint')


Array.from(drop).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const symptoms = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = this.parentNode.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'symptoms': symptoms,
            'thumbUp': thumbUp
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const symptoms = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = this.parentNode.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'symptoms': symptoms,
            'thumbUp': thumbUp
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});
