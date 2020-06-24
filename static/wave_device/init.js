$(document).ready(function () {
    //var plotting_waves = new PlottingWaves();
    //var waveshaper = new WaveControls();



    // waveshaper.PrintInitialLabels();
    // // var shapecontrols = LoadDeviceVisualization();
    // // console.log(shapecontrols[0].value)


    // plotting_waves.load_input_plot(true);

    var collector_ext = null;
    var device = new Device();

    $('.selectwave_btn').click(function () {
        var wave_btn = $(this).attr('accesskey')
        $('.selectwave_btn.active').removeClass('active')
        $(this).addClass('active')
        device.wave_shape = wave_btn;
        device.InitializeEnvelope()
        console.log(device.wave_shape);
    });

    window.onresize = function () {
        device.ManageEnvelope();
    };
})

$('.btn_wave').click(function () {
    var led_potentiometer_pos = $(this).attr('accesskey');
    console.log(led_potentiometer_pos);
    Device.ActivatePotentiometerLeds(led_potentiometer_pos);
})





class Device {
    wave_shape = 0
    led_potentiometer_pos = null;
    envelopeKnobs = null;
    saved_knob_values = null;
    initial_envelope_values = null;
    constructor() {
        //  CONST
        this.SYSTEM_SIMULATION_TIME = 20;
        this.SYSTEM_DELTA_T = 0.1
        this.SAMPLES = 200

        //  SCREEN
        this.width_screen_offset = 10;
        this.width_screen = document.getElementsByClassName("envelope-visualizer")[0]
            .getClientRects()[0].width;

        this.offset_time = 1;

        this.initial_envelope_values = [[0, 2, 20], [0, 1, 1]]
        // this.initial_wheels_values = [2,]

        this.param_labels = [];
        this.led_potentiometer_pos = 0;
        this.LoadDeviceVisualization();
        this.DeviceListenersAndEvents();

        this.SetParamLabels();
        this.PrintParamLabels();//#
        this.InitializeEnvelope();
    }

    RestartKnobs(save_state) {
        var s_state = [];
        var slf = this;
        $.each($(this.envelopeKnobs), function (i, el) {
            if (save_state == true) {
                $(s_state).push(this.value);
            }
            this.value = 0;
        })
        return s_state;
    }

    InitializeEnvelope() {
        this.RestartKnobs(false)
        $('.envelope-visualizer').empty();
        this.ManageEnvelope();
    }

    ManageEnvelope() {
        $('.envelope-visualizer').empty();
        this.StaticEnvelopeScenario();
        this.EnvelopeTemplates();
        this.PrintParamLabels();
    }

    StaticEnvelopeScenario(envelope_visualizer) {
        var envelope_visualizer = $('.envelope-visualizer');
        var width = this.width_screen - 2 * this.width_screen_offset;
        var width_rate = width / (this.SYSTEM_DELTA_T * this.SAMPLES);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.width_screen_offset,
            y: 150,
            width: width,
            height: 0.1,
            stroke: "white"
        });
        $(envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.width_screen_offset,
            y: 290,
            width: width,
            height: 0.1,
            stroke: "white"
        });
        $(envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.width_screen_offset,
            y: 0,
            width: 0.1,
            height: 300,
            stroke: "red",
            opacity: 0.2
        });
        $(envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: this.width_screen_offset + width,
            y: 0,
            width: 0.1,
            height: 400,
            stroke: "red",
            opacity: 0.2
        });
        $(envelope_visualizer).append($bar);

        for (var i = 0; i < 21; i++) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: this.width_screen_offset + i * (width_rate),
                y: 280,
                width: 0.1,
                height: 10,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);

            if (i != 20) {
                var $br = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                    x: this.width_screen_offset + (i * (width_rate) + width_rate / 2),
                    y: 285,
                    width: 0.1,
                    height: 5,
                    stroke: "red"
                });
                $(envelope_visualizer).append($br);
            }

        }
    }

    EnvelopeTemplates() {
        switch (parseInt(this.wave_shape)) {
            case 0: //  STEP
                this.StepEnvelope_template();
                break;
            case 1:
                this.StepEnvelope_template();
                break;

        }
    }

    StepEnvelope_template() {
        var envelope_visualizer = $('.envelope-visualizer');
        var width = this.width_screen - 2 * this.width_screen_offset;
        var width_rate = width / (this.SYSTEM_DELTA_T * this.SAMPLES);

        var in_time = true;
        var curr_width = this.width_screen_offset;

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: curr_width,
            y: 290,
            width: ($(this.envelopeKnobs)[0].value / this.SYSTEM_SIMULATION_TIME) * width_rate,
            height: 1,
            stroke: "red"
        });
        $(envelope_visualizer).append($bar);
        curr_width += ($(this.envelopeKnobs)[0].value / this.SYSTEM_SIMULATION_TIME) * width_rate
        var i = $(this.envelopeKnobs)[0].value;
        while (in_time == true) {
            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 150,
                width: 1,
                height: 140,
                stroke: "blue"
            });
            $(envelope_visualizer).append($bar);

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 150,
                width: ($(this.envelopeKnobs)[1].value / this.SYSTEM_SIMULATION_TIME) * width_rate,
                height: 1,
                stroke: "green"
            });
            $(envelope_visualizer).append($bar);
            curr_width += ($(this.envelopeKnobs)[1].value / this.SYSTEM_SIMULATION_TIME) * width_rate

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 150,
                width: 1,
                height: 140,
                stroke: "yellow"
            });
            $(envelope_visualizer).append($bar);

            var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
                x: curr_width,
                y: 290,
                width: ($(this.envelopeKnobs)[2].value / this.SYSTEM_SIMULATION_TIME) * width_rate,
                height: 1,
                stroke: "magenta"
            });
            $(envelope_visualizer).append($bar);
            curr_width += ($(this.envelopeKnobs)[2].value / this.SYSTEM_SIMULATION_TIME) * width_rate

            if (i < (this.SYSTEM_SIMULATION_TIME / this.SYSTEM_DELTA_T)) {
                i++;
            } else {
                in_time = false;
            }
        }
    }

    SquareEnvelope_template() {
        this.width_screen = 0;
        var width_rate = width / 20

        varoffset_time_width = this.offset_time;

        var width_offset = width_screen_offset;


        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: width_offset,
            y: 290,
            width: this.envelopeKnobs[0].value * width_work,
            height: 1,
            stroke: "blue"
        });
        $(this.envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: width_offset + 3 * width_work,
            y: 150,
            width: 1,
            height: 140,
            stroke: "blue"
        });
        $(this.envelope_visualizer).append($bar);

        var $bar = $(document.createElementNS("http://www.w3.org/2000/svg", "rect")).attr({
            x: width_offset + 3 * width_work,
            y: 150,
            width: width_screen - (width_offset + 3 * width_work) + width_offset,
            height: 1,
            stroke: "blue"
        });
        $(this.envelope_visualizer).append($bar);
    }


    SetParamLabels() {
        this.param_labels.push(['Delay [s]', 'Step up [s]', 'Step down [s]', 'Amp [m]', ' Angle[s]']);
        this.param_labels.push(['Delay [s]', 'Sustain [s]', 'Decay [s]', 'Amp/step [s]', 'Max. Amp [s]']);
    }

    ControlWaves() {
        this.wave_controls = $('.main_shaper').find('.fl-studio-envelope__label');
    }

    ResetWheels() {
        var wheels = $('.fl-studio-envelope__knob.envelope-knob');
        //console.log(wheels[0].value / 100)
    }

    PrintParamLabels() {

        var labels = $('.main_shaper').find('.fl-studio-envelope__label');
        var param_lbls = this.param_labels[this.wave_shape];
        //console.log(param_lbls.length)

        $.each(labels, function (i, lbl) {
            var lbl_txt = param_lbls[i]
            //console.log(lbl_txt)
            $(this).html(lbl_txt);
        })

    }

    Digital7segMarker(amt) {
        var splitted_amt = String(amt).split('.');
        // console.log(splitted_amt[0].toString().length)
        if (parseInt(splitted_amt[0]) < 10) {
            $("#int2").attr("class", "num-" + splitted_amt[0].substr(0, 1));
            $("#int1").attr("class", "clck_disabled num-0");
            $("#int0").attr("class", "clck_disabled num-0");
        } else if (parseInt(splitted_amt[0]) < 100) {
            $("#int2").attr("class", "num-" + splitted_amt[0].substr(1, 1));
            $("#int1").attr("class", "num-" + splitted_amt[0].substr(0, 1));
            $("#int0").attr("class", "clck_disabled num-0");
        } else {
            $("#int2").attr("class", "num-" + splitted_amt[0].substr(2, 1));
            $("#int1").attr("class", "num-" + splitted_amt[0].substr(1, 1));
            $("#int0").attr("class", "num-" + splitted_amt[0].substr(0, 1));
        }

        if (splitted_amt.length == 2) {
            if (amt == 100) {
                $("#dec0").attr("class", "clck_disabled num-0");
            }
            $("#dec2").attr("class", "clck_disabled num-0");
            $("#dec1").attr("class", "clck_disabled num-0");
            $("#dec0").attr("class", "num-" + splitted_amt[1].substr(0, 1));
        }
    }

    DeviceListenersAndEvents() {
        var slf = this;
        $.each($(this.envelopeKnobs), function (i, el) {
            el.addEventListener('change', function () {
                //slf.Digital7segMarker(el.value / slf.SYSTEM_SIMULATION_TIME);
                slf.ManageEnvelope();
            })
        });

    }

    LoadDeviceVisualization() {
        // Demo Setup - Knobs

        var transformProp = getTransformProperty();

        var envelopeKnobStartPositions = [10, 20, 30, 0, 10, 0];
        this.envelopeKnobs = [...document.querySelectorAll('.fl-studio-envelope__knob.envelope-knob_shapes')];
        this.envelopeKnobs = this.envelopeKnobs.map((el, idx) => new KnobInput(el, {
            visualContext: function () {
                this.indicatorRing = this.element.querySelector('.indicator-ring');
                var ringStyle = getComputedStyle(this.element.querySelector('.indicator-ring-bg'));
                this.r = parseFloat(ringStyle.r) - (parseFloat(ringStyle.strokeWidth) / 2);
                this.indicatorDot = this.element.querySelector('.indicator-dot');
                this.indicatorDot.style[`${transformProp}Origin`] = '20px 20px';
            },
            updateVisuals: function (norm) {
                var theta = Math.PI * 2 * norm + 0.5 * Math.PI;
                var endX = this.r * Math.cos(theta) + 20;
                var endY = this.r * Math.sin(theta) + 20;
                // using 2 arcs rather than flags since one arc collapses if it gets near 360deg
                this.indicatorRing.setAttribute('d', `M20,20l0,${this.r}${norm > 0.5 ? `A${this.r},${this.r},0,0,1,20,${20 - this.r}` : ''}A-${this.r},${this.r},0,0,1,${endX},${endY}Z`);
                this.indicatorDot.style[transformProp] = `rotate(${360 * norm}deg)`;
            },
            min: 0,
            max: 100,
            initial: envelopeKnobStartPositions[idx],
        }));

        // return;

        // var tensionKnobStartPositions = [0, 0, -80];
        // var tensionKnobs = [...document.querySelectorAll('.fl-studio-envelope__knob.tension-knob')];
        // var tensionKnobs = tensionKnobs.map((el, idx) => new KnobInput(el, {
        //     visualContext: function () {
        //         this.indicatorRing = this.element.querySelector('.indicator-ring');
        //         var ringStyle = getComputedStyle(this.element.querySelector('.indicator-ring-bg'));
        //         this.r = parseFloat(ringStyle.r) - (parseFloat(ringStyle.strokeWidth) / 2);
        //     },
        //     updateVisuals: function (norm) {
        //         var theta = Math.PI * 2 * norm + 0.5 * Math.PI;
        //         var endX = this.r * Math.cos(theta) + 20;
        //         var endY = this.r * Math.sin(theta) + 20;
        //         this.indicatorRing.setAttribute('d', `M20,20l0,-${this.r}A${this.r},${this.r},0,0,${norm < 0.5 ? 0 : 1},${endX},${endY}Z`);

        //     },
        //     min: -100,
        //     max: 100,
        //     initial: tensionKnobStartPositions[idx],
        // }));

        // Demo Setup - Envelope Visualization
    }

    CalculateSignal() {

    }

}

class Signal extends Device {

    constructor(signal_type, signal_data) {
        this.signal_data = signal_data;
        this.signal_type = signal_type;
        this.sim_time = []
        this.sim_y = []
        this.sim_velocity = []
        this.sim_acceleration = []



        this.wave_calc = new WaveCalc();
    }

    GenerateSignal() {
        console.log(on)
        var signal = this.wave_calc(parent.SYSTEM_DELTA_T, parent.SAMPLES)
        system_t, system_y, system_v, system_a = signal.GenerateSignalValues(this.signal_type, this.signal_data)

        this.sim_time = system_t
        this.sim_y = system_y
        this.sim_velocity = system_v
        this.sim_acceleration = system_a
        sgnl = [system_t, system_y, system_v, system_a]
        return sgnl;
    }


}



















