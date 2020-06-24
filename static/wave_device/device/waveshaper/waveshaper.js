// class WaveControls {
//     constructor() {
//         this.param_labels = [];
//         this.wave_controls = []
//         this.ParamLabel();
//         this.ControlWaves();
//     }

//     ParamLabel() {
//         this.param_labels.push(['Delay [s]', 'Sustain [s]', 'Decay [s]', 'Amp/step [s]', 'Max. Amp [s]']);
//     }

//     ControlWaves() {
//         this.wave_controls = $('.main_shaper').find('.fl-studio-envelope__label');
//     }

//     ResetWheels() {
//         var wheels = $('.fl-studio-envelope__knob.envelope-knob');
//         console.log(wheels[0].value / 100)

//     }

//     PrintInitialLabels() {

//         var labels = $('.main_shaper').find('.fl-studio-envelope__label');
//         var param_lbls = this.param_labels[0];
//         console.log(param_lbls.length)

//         // for(var i = 0 ; i< param_lbls.length; i++){
//         //     var lbl_txt = param_lbls[i]
//         //     console.log(lbl_txt)
//         //     labels[i].html(lbl_txt);
//         // }

//         $.each(labels, function (i, lbl) {

//             var lbl_txt = param_lbls[i]
//             console.log(lbl_txt)
//             $(this).html(lbl_txt);
//         })

//     }
// }
