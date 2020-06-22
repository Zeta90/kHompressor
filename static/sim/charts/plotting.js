// var $system_static_optimal_spectrum = $('#system_static_optimal_spectrum');
// var ctx = system_static_optimal_output.getContext("2d")
// var gradientStroke = ctx.createLinearGradient(0, 0, 0, 300);
// gradientStroke.addColorStop(0, 'red');
// gradientStroke.addColorStop(0.5, "yellow");
// gradientStroke.addColorStop(1, "green");


class Plotting {
    constructor() {
        this.system_x_chart;
        this.init_t = []
        this.init_y = []
        for (var i = 0; i < 200; i++) {
            this.init_t.push((i * 0.1).toFixed(1).toString());
            this.init_y.push(1);
        }
        this.init_t.push(20);
    }//.toFixed(1)

    load_input_plot(newChart) {
        var charts = $('.fss');
        $.each(charts, function (i, chrt) {
            console.log(chrt);
            var ctx = chrt.getContext('2d');
            ctx.clearRect(0, 0, chrt.width, chrt.height);

        })
        if (newChart == true) {
            var system_x = $('.f_activ');
        } else {
            var system_x = newChart;
        }
        this.system_x_chart = new Chart(system_x, {
            type: 'line',
            data: {
                labels: this.init_t,
                datasets: [{
                    label: 'Unfilled',
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    data: this.init_y,
                }]
            },
            options: {
                // responsive: true,
                // title: {
                // 	display: true,
                // 	text: 'Chart.js Line Chart'
                // },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                // hover: {
                // 	mode: 'nearest',
                // 	intersect: true
                // },
                scales: {

                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                            beginAtZero: true   // minimum value will be 0.
                        }, ticks: {
                            // callback: function (value) {
                            //     if (!(value % 2)) {
                            //         console.log(value)
                            //         return value;
                            //     }
                            // }
                        }
                    }],
                    xAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                            beginAtZero: true   // minimum value will be 0.
                        }, ticks: {
                            callback: function (value) {
                                if ((value) % 5) {
                                    return value;
                                }
                            }
                        }
                    }],

                },
                // scales: {
                // 	xAxes: [{
                // 		display: true,
                // 		// scaleLabel: {
                // 		// 	display: true,
                // 		// 	labelString: 'Month'
                // 		// }
                // 	}],
                // 	yAxes: [{
                // 		display: true,
                // 		// scaleLabel: {
                // 		// 	display: true,
                // 		// 	labelString: 'Value'
                // 		// }
                // 	}]
                // }
            }
        });
        system_x.data('chart', this.system_x_chart);

    }

    Stage1_plot(t, y) {

        this.system_x_chart.data.label = t;
        this.system_x_chart.data.datasets[0].data = y;

        this.system_x_chart.update();

        // this.system_x_chart.render();
        console.log(y)
        // $system_x_chart.series.data = y
        // $system_x_chart.labels = t
        // $system_x_chart.render();
        console.log(t)



        // var $system_velocity = $('#system_velocity');
        // var system_velocity_chart = new Chart($system_velocity, {
        //     type: 'line',
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 gridLines: {
        //                     lineWidth: 1,
        //                     color: Charts.colors.gray[900],
        //                     zeroLineColor: Charts.colors.gray[900]
        //                 },
        //                 ticks: {
        //                     callback: function(value) {
        //                         if (!(value % 10)) {
        //                             return value;
        //                         }
        //                     }
        //                 }
        //             }]
        //         },
        //         tooltips: {
        //             callbacks: {
        //                 label: function(item, data) {
        //                     var label = data.datasets[item.datasetIndex].label || '';
        //                     var yLabel = item.yLabel;
        //                     var content = '';

        //                     if (data.datasets.length > 1) {
        //                         content += '<span class="popover-body-label mr-auto">' + label + '</span>';
        //                     }

        //                     content += '<span class="popover-body-value">$' + yLabel + 'k</span>';
        //                     return content;
        //                 }
        //             }
        //         }
        //     },
        //     data: {
        //         labels: time,
        //         datasets: [{
        //             label: 'Performance',
        //             data: velocity
        //                 //data: static_response
        //         }]
        //     }
        // });
        // $system_velocity.data('chart', system_velocity_chart);
    }
}





// function Stage2_plot(static_response, time, static_frequencies, static_spectrum) {
//     //console.log(static_frequencies)
//     var $system_static_output = $('#system_static_output');
//     var system_static_output_chart = new Chart($system_static_output, {
//         type: 'line',
//         options: {
//             scales: {
//                 yAxes: [{
//                     gridLines: {
//                         //lineWidth: 1,
//                         color: Charts.colors.gray[900],
//                         zeroLineColor: Charts.colors.gray[900]
//                     },
//                     ticks: {
//                         callback: function(value) {
//                             if (!(value % 10)) {
//                                 return value;
//                             }
//                         }
//                     }
//                 }]
//             },
//             tooltips: {
//                 callbacks: {
//                     label: function(item, data) {
//                         var label = data.datasets[item.datasetIndex].label || '';
//                         var yLabel = item.yLabel;
//                         var content = '';

//                         if (data.datasets.length > 1) {
//                             content += '<span class="popover-body-label mr-auto">' + label + '</span>';
//                         }

//                         content += '<span class="popover-body-value">$' + yLabel + 'k</span>';
//                         return content;
//                     }
//                 }
//             }
//         },
//         data: {
//             labels: time,
//             datasets: [{
//                 label: 'Performance',
//                 data: static_response
//             }]
//         }
//     });
//     $system_static_output.data('chart', system_static_output_chart);

//     var $system_static_spectrum = $('#system_static_spectrum');
//     var system_static_spectrum_chart = new Chart($system_static_spectrum, {
//         type: 'line',
//         options: {
//             scales: {
//                 yAxes: [{

//                     gridLines: {
//                         lineWidth: 1,
//                         color: Charts.colors.gray[900],
//                         zeroLineColor: Charts.colors.gray[900]
//                     },
//                     ticks: {
//                         callback: function(value) {
//                             if (!(value % 10)) {
//                                 return value;
//                             }
//                         }
//                     }
//                 }],
//                 xAxes: [{
//                     ticks: {
//                         beginAtZero: true,
//                         steps: 100,
//                         stepValue: 1,
//                         max: 2
//                     },
//                     gridLines: {
//                         lineWidth: 1,
//                         color: Charts.colors.gray[900],
//                         zeroLineColor: Charts.colors.gray[900]
//                     }
//                 }]
//             },
//             tooltips: {
//                 callbacks: {
//                     label: function(item, data) {
//                         var label = data.datasets[item.datasetIndex].label || '';
//                         var yLabel = item.yLabel;
//                         var content = '';

//                         if (data.datasets.length > 1) {
//                             content += '<span class="popover-body-label mr-auto">' + label + '</span>';
//                         }

//                         content += '<span class="popover-body-value">$' + yLabel + 'k</span>';
//                         return content;
//                     }
//                 }
//             }
//         },
//         data: {
//             labels: static_frequencies,
//             datasets: [{
//                 label: 'Performance',
//                 data: static_spectrum
//             }]
//         }
//     });
//     $system_static_spectrum.data('chart', system_static_spectrum_chart);
// }

// function Stage3_plot(input,static_response, time, static_optimal_spectrum, static_optimal_frequencies,triangle) {
//     console.log('---->>>>>>>>>>>>>>>>>>>')
//     console.log(static_optimal_spectrum)
//     var $system_static_optimal_output = $('#system_static_optimal_output');
//     var system_static_optimal_output_chart = new Chart($system_static_optimal_output, {
//         type: 'line',
//         zoom: {
//             enabled: false,
//             //mode: 'xy',
//         },
//         options: {
//             tension: 0.1,
//             borderWidth: 1,
//             scales: {
//                 yAxes: [{
//                     gridLines: {
//                         //lineWidth: 1,
//                         color: Charts.colors.gray[900],
//                         zeroLineColor: Charts.colors.gray[900]
//                     },
//                     ticks: {
//                         callback: function(value) {
//                             if (!(value % 10)) {
//                                 return value;
//                             }
//                         }
//                     }
//                 }]
//             },
//             tooltips: {
//                 callbacks: {
//                     label: function(item, data) {
//                         var label = data.datasets[item.datasetIndex].label || '';
//                         var yLabel = item.yLabel;
//                         var content = '';

//                         if (data.datasets.length > 1) {
//                             content +=  label;
//                         }

//                         content += '<p>' + yLabel + '</p>';
//                         return content;
//                     }
//                 }
//             }
//         },
//         data: {
//             labels: time,
//             datasets: [{
//                 label: 'Static output',
//                 data: [0],
//                 borderWidth:1,
//                 borderColor: gradientStroke,
//                 pointBorderColor: gradientStroke,
//                 pointBackgroundColor: gradientStroke,
//                 pointHoverBackgroundColor: gradientStroke,
//                 pointHoverBorderColor: gradientStroke,
//             },
//             {
//                 label: 'Input',
//                 data: input,
//                 borderColor: 'green',
//                 borderWidth:1,
//                 borderDash: [5, 5],
//             }
//         ]
//         }
//     });
//     $system_static_optimal_output.data('chart', system_static_optimal_output_chart);




//     var system_static_optimal_spectrum_chart = new Chart($system_static_optimal_spectrum, {
//         type: 'line',
//         zoom: {
//             enabled: false,
//             //mode: 'xy',
//         },
//         options: {
//             scales: {
//                 yAxes: [{

//                     gridLines: {
//                         lineWidth: 1,
//                         color: Charts.colors.gray[900],
//                         zeroLineColor: Charts.colors.gray[900]
//                     },
//                     ticks: {
//                         callback: function(value) {
//                             if (!(value % 10)) {
//                                 return value;
//                             }
//                         }
//                     }
//                 }],
//                 xAxes: [{
//                     ticks: {
//                         beginAtZero: true,
//                         steps: 100,
//                         stepValue: 10,
//                         max: 2
//                     },
//                     gridLines: {
//                         lineWidth: 1,
//                         color: Charts.colors.gray[900],
//                         zeroLineColor: Charts.colors.gray[900]
//                     }
//                 }]
//             },
//             tooltips: {
//                 callbacks: {
//                     label: function(item, data) {
//                         var label = data.datasets[item.datasetIndex].label || '';
//                         var yLabel = item.yLabel;
//                         var content = '';

//                         if (data.datasets.length > 1) {
//                             content += '<span class="popover-body-label mr-auto">' + label + '</span>';
//                         }

//                         content += '<span class="popover-body-value">' + yLabel + '</span>';
//                         return content;
//                     }
//                 }
//             }
//         },
//         data: {
//             labels: static_optimal_frequencies,
//             datasets: [{
//                 type:'bar',
//                     label: 'Response Frequency',
//                     data: [],
//                     borderColor: gradientStroke,
//                     pointBorderColor: gradientStroke,
//                     pointBackgroundColor: gradientStroke,
//                     pointHoverBackgroundColor: gradientStroke,
//                     pointHoverBorderColor: gradientStroke,
//                     borderWidth: 9
//                 },
//                 {
//                     label: 'Optimal freuqency',
//                     data: [],
//                     borderDash: [5, 5],
//                     pointBorderColor: 'green',
//                     borderColor: 'green',
//                     borderWidth: 1
//                 }
//             ]
//         }
//     });
//     $system_static_optimal_spectrum.data('chart', system_static_optimal_spectrum_chart);


//     console.log(triangle)


//     var $bar = $('#timeline_1');
//     var $ball = $('#timemarker_1');
//     bar_initial_left = 0

//     k = 0;
//     spectrum = [].fill.call({ length: 200 / 2 }, 0);
//     spectrum_opt = [].fill.call({ length: 200 / 2 }, 0);

//     //console.log(static_optimal_spectrum)
//     a = (function myLoop(i) {
//         setTimeout(function() {
//             //if ((i - 1) % 10 == 0 || i == 1) {

//             j = 200 - i
//                 //console.log('j: ' + j + '  -  k:  ' + k)

//             system_static_optimal_output_chart.data.datasets[0].data = (static_response.slice(0, j));
//             if (j % 2 == 0) {
//                 var c_spectrum = static_optimal_spectrum[k];
//                 //console.log(c_spectrum)
//                 var max = Math.max.apply(Math, spectrum);
//                 //console.log(max)
//                 for (cnt = 0; cnt < c_spectrum.length; cnt++) {
//                     spectrum[cnt] += (-spectrum[cnt] + c_spectrum[cnt])
//                     spectrum_opt[cnt] = (max - spectrum[cnt])
//                 }



//                 system_static_optimal_spectrum_chart.data.datasets[0].data = (spectrum);
//                 system_static_optimal_spectrum_chart.data.datasets[1].data = (spectrum_opt);

//                 //console.log(triangle[0])
//                 //console.log(c_spectrum.length)

//             }
//             k += 1;
//             // system_static_optimal_spectrum_chart.data.datasets[0].data = (spectrum);
//             // console.log(spectrum)
//             system_static_optimal_output_chart.update();
//             system_static_optimal_spectrum_chart.update();

//             //}
//             bar_initial_left += 1
//             // $ball.css('left', (j / 2) + '%');
//             // $bar.css('left', (j / 2) + '%');
//             rot = triangle[0][j];
//             rot = parseFloat(rot) * 30;
//             $('.second').css('transform','rotate(' + (rot) + 'deg)')
//             console.log((rot))
//             if (--i) {
//                 myLoop(i);

//             } else {
//                 // j = 200 - i
//                 // k = 100 - (2 * j);
//                 // system_static_optimal_output_chart.data.datasets[0].data = (static_response.slice(0, j));
//                 // system_static_optimal_spectrum_chart.data.datasets[0].data = (static_optimal_frequencies.slice(0, k));
//                 system_static_optimal_output_chart.update();
//                 system_static_optimal_spectrum_chart.update();
//             }
//             //console.log(bar_initial_left)
//         }, 20)
//     })(200)


// }