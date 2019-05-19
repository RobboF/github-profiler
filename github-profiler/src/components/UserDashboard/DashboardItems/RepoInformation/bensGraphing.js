Array.prototype.rotate = function(n) {
  return this.slice(n, this.length).concat(this.slice(0,n))
}
const randomRange = (y, x=0) => {
  return Math.floor(Math.random() * (y - x) + x)
}
const returnRGBa = (alpha=true) => {
  if(alpha)
    return `rgba(${randomRange(256)}, ${randomRange(256)}, ${randomRange(256)}, 0.2)`
  else
    return `rgba(${randomRange(256)}, ${randomRange(256)}, ${randomRange(256)})`
}
const handleRepo = (node) => {
  var yearPrior = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
  var nextMonth = new Date(new Date().setFullYear(yearPrior.getFullYear()))
  nextMonth = new Date(nextMonth.setMonth(yearPrior.getMonth() + 1))
  var monthCnt = 0
  var dataArray = new Array(12).fill(0)
  try {
    node = node['node']
    var commits = node['defaultBranchRef']['target']['history']['edges']
  } catch(e) {
    throw e
  }
  for(var i = 0; i < commits.length; i++) {
    var commitObj = commits[i]['node']
    var commitDate = new Date(commitObj['committedDate'])
    if(commitDate < yearPrior)
      continue
    if(commitDate < nextMonth) {
      dataArray[monthCnt]++
    } else {
      monthCnt++
      yearPrior = new Date(nextMonth)
      nextMonth = new Date(nextMonth.setMonth(yearPrior.getMonth() + 1))
    }
  }
  return {
    label: node['name'],
    fill: true,
    lineTension: 0.3,
    backgroundColor: returnRGBa(),
    borderColor: returnRGBa(false),
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: returnRGBa(false),
    pointBackgroundColor: returnRGBa(false),
    pointBorderWidth: 10,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: returnRGBa(false),
    pointHoverBorderColor: returnRGBa(),
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: dataArray
  }
}
const constructGraphData = (commitData) => {
  const labels = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"].rotate(new Date().getMonth());
  var datasets = []
  commitData = commitData['data']['data']['user']['repositories']['edges']
  for(var i = 0; i < commitData.length; i++) {
    datasets.push(handleRepo(commitData[i]))
  }

  console.log(labels)
  return {
    'dataLine': {
      'labels': labels,
      'datasets': datasets
    }
  }
}
export default constructGraphData
