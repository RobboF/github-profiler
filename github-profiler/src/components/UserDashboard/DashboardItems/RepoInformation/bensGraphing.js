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
    yearPrior = new Date(yearPrior.setDate(0))
    yearPrior = new Date(yearPrior.setMonth(yearPrior.getMonth() + 1))
    var dataArray = new Array(12).fill(0)
    try {
      node = node['node']
      var commits = node['defaultBranchRef']['target']['history']['edges'].reverse()
    } catch(e) {
      throw e
    }
    var commitCnt = 0
    var commitDate = ''
    do {
      if(commitCnt == commits.length)
        break
      commitDate = new Date(commits[commitCnt]['node']['committedDate'])
      commitCnt++
    } while(commitDate < yearPrior)
    commitCnt -= 1
    // TODO: This and end of month
    for(var i = 0; i < 12; i++) {
      while(commitDate.getMonth() == yearPrior.getMonth()) {
        commitCnt++
        dataArray[i]++
        if(commitCnt >= commits.length)
          break
        commitDate = new Date(commits[commitCnt]['node']['committedDate'])
      }
      yearPrior = new Date(yearPrior.setMonth(yearPrior.getMonth() + 1))
    }
    console.log(node['name'] + ': ' + dataArray)
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
    console.log(commitData)
    commitData = commitData['data']['data']['user']['repositories']['edges']
    for(var i = 0; i < commitData.length; i++) {
      datasets.push(handleRepo(commitData[i]))
    }
    return {
      'dataLine': {
        'labels': labels,
        'datasets': datasets
      }
    }
  }
export default constructGraphData
