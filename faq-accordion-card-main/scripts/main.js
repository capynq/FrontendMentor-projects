let expEl = document.querySelectorAll('.title')
expEl.forEach((li) => {
  li.addEventListener(
    'click',
    function () {
      const paragraph = this.nextElementSibling

      document.querySelectorAll('#paragraph.open').forEach((openParagraph) => {
        if (openParagraph !== paragraph) {
          openParagraph.classList.remove('open')
        }
      })

      paragraph.classList.toggle('open')
    },
    false
  )
})
