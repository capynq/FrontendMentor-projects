const priceTiers = [
  { max: 10, views: '10K pageviews', price: '$8.00' },
  { max: 30, views: '50K pageviews', price: '$12.00' },
  { max: 50, views: '100K pageviews', price: '$16.00' },
  { max: 70, views: '500K pageviews', price: '$24.00' },
  { max: 100, views: '1M pageviews', price: '$36.00' }
]

const views = document.querySelector('#pageviews h2')
const pricePerMonth = document.querySelector('#cost span')
const rangeSlider = document.getElementById('sliderRange')

function priceSet() {
  const value = Number(rangeSlider.value)
  const tier =
    priceTiers.find((t) => value <= t.max) || priceTiers[priceTiers.length - 1]
  views.textContent = tier.views
  pricePerMonth.textContent = tier.price
}

rangeSlider.addEventListener('input', priceSet)
priceSet()
