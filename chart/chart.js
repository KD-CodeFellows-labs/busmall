
var barData = {
  labels : ['Jan','Feb','Mar','Apr','May','Jun'],
  datasets : [
    {
      fillColor : '#48A497',
      strokeColor : '#48A4D1',
      data : [456,479,324,569,702,600]
    },
    {
      fillColor : 'rgba(73,188,170,0.4)',
      strokeColor : 'rgba(72,174,209,0.4)',
      data : [364,504,605,400,345,320]
    }
  ]
};

var income = document.getElementById('income').getContext('2d');
new Chart(income).Bar(barData);
