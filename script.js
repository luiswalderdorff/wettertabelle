const wetterArray = wetterDaten.split("eor");

let wetterArray2 = [];

for(let i = 0; i < wetterArray.length; i++) {
	wetterArray2.push(wetterArray[i].split(";"));
}

$("#searchButton").click(function () {
	// Alles vom table entfernen
	$("#table-body").empty();
	// When searchvalue mit dem Jahr vom Data übereinstimmt, eine table row erstellen
	const searchValue = $("#searchBar").val();
	let jan, feb, counter, mär, apr, mai, jun, jul, aug, sep, okt, nov, dez;
	jan = feb = counter = mär = apr = mai = jun = jul = aug = sep = okt = nov = dez = 0;
	for(let i = 0; i < wetterArray2.length - 1; i++) {
		const year = wetterArray2[i][1].substring(0, 4);
		if (searchValue === year) {
			const date = wetterArray2[i][1].substring(4, 6) + "/" + wetterArray2[i][1].substring(6, 8);
			// Get average temperatur per month
			switch(wetterArray2[i][1].substring(4, 6)) {
			  case "01":
			    jan += Number(wetterArray2[i][13]);
			    break;
			  case "02":
			    feb += Number(wetterArray2[i][13]);
			    counter++;
			    break;
			  case "03":
			    mär += Number(wetterArray2[i][13]);
			    break;
			  case "04":
			    apr += Number(wetterArray2[i][13]);
			    break;
			  case "05":
			    mai += Number(wetterArray2[i][13]);
			    break;
			  case "06":
			    jun += Number(wetterArray2[i][13]);
			    break;
			  case "07":
			    jul += Number(wetterArray2[i][13]);
			    break;
			  case "08":
			    aug += Number(wetterArray2[i][13]);
			    break;
			  case "09":
			    sep += Number(wetterArray2[i][13]);
			    break;
			  case "10":
			    okt += Number(wetterArray2[i][13]);
			    break;
			  case "11":
			    nov += Number(wetterArray2[i][13]);
			    break;
			  case "12":
			    dez += Number(wetterArray2[i][13]);
			    break;
			  default:
			    console.log("error");
			}
			$("#table-body").append(`
				<tr>
					<td>${date}</td>
					<td>${wetterArray2[i][13]}°C</td>
				</tr>
			`);
		}
	}
	const data = [
				jan/31,
				feb/counter,
				mär/31,
				apr/30,
				mai/31,
				jun/30,
				jul/31,
				aug/31,
				sep/30,
				okt/31,
				nov/30,
				dez/31
			]
	changeData(data);
});

// Second Search Bar
$(document).ready(function(){
  $("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table-body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // Search on clicking enter
  $('#searchBar').keypress(function(event){
      if(event.keyCode==13) {
      	$('#searchButton').click();
      }
    });
});

// Chart
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        datasets: [{
            label: 'Durchschnittliche Temperatur pro Monat',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// Tablesort plugin

$('table').tablesort();

// Add Chart data
function changeData(data) {
	myChart.data = {
		labels: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        datasets: [{
            label: 'Durchschnittliche Temperatur pro Monat',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
	};
	myChart.update();
}


// Average temp per year array
let  yearsArray = [];
let yearsNumbers = [];

for (let i = 1881; i <= 2018; i++) {
	yearsArray[i] = 0;
	yearsNumbers.push(i);
}

for (let i = 0; i < wetterArray2.length - 1; i++) {
	const year = Number(wetterArray2[i][1].substring(0, 4));
	yearsArray[year] += Number(wetterArray2[i][13]);
}

let yearsArray2 = [];
for (let i = 1881; i <= 2018; i++) {
	if(i % 4 === 0 && i % 100 !== 0 || i % 400 === 0) {
		yearsArray2.push(yearsArray[i]/366);
	} else {
		yearsArray2.push(yearsArray[i]/365);
	}
}



if (yearsArray && yearsNumbers) {
	var ctx2 = document.getElementById('myChart2').getContext('2d');
	var averageChart = new Chart(ctx2, {
	    type: 'line',
	    data: {
	        labels: yearsNumbers,
	        datasets: [{
	            label: 'Durchschnittliche Temperatur pro Jahr',
	            data: yearsArray2,
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 206, 86, 0.2)',
	                'rgba(75, 192, 192, 0.2)',
	                'rgba(153, 102, 255, 0.2)',
	                'rgba(255, 159, 64, 0.2)'
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}


