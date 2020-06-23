$(document).ready(function () {
    var plotting_waves = new PlottingWaves();
    var waveshaper = new WaveShaper();


    waveshaper.PrintInitialLabels();
    // var shapecontrols = LoadDeviceVisualization();
    // console.log(shapecontrols[0].value)


    plotting_waves.load_input_plot(true);


    $('.wave_btn').click(function () {
        var selected_wave = $(this).attr('accesskey');
        var newChart = $('#system_x');
        plotting_waves.load_input_plot(newChart);
        // $waveshaper
        //$plotting.load_input_plot(newChart);
    });

    var collector_ext = null;
    var device = new Device();
})

$('.envelope-knob').mousedown(function () {
    var led_potentiometer_pos = $(this).attr('accesskey');
    console.log(led_potentiometer_pos);
    Device.ActivatePotentiometerLeds(led_potentiometer_pos);
})


class Device {
    led_potentiometer_pos = null;
    envelopeKnobs = null;
    constructor() {
        this.led_potentiometer_pos = 0;
        this.LoadDeviceVisualization();
        this.DeviceListeners();
    }

    Digital7segMarker(amt) {
        var splitted_amt = String(amt).split('.');
        console.log(splitted_amt[0].toString().length)
        if (splitted_amt[0].toString().length == 2) {
            $("#int2").attr("class", "num-" + splitted_amt[0].substr(1, 1));
            $("#int1").attr("class", "num-" + splitted_amt[0].substr(0, 1));
            $("#int0").attr("class", "clck_disabled num-0");
        }
        if (splitted_amt[0].lenght == 1) {
            $("#int2").attr("class", "num-" + splitted_amt[0].substr(0, 1));
            $("#int1").attr("class", "clck_disabled num-0");
            $("#int0").attr("class", "clck_disabled num-0");
        }
    }

    DeviceListeners() {
        var slf = this
        $.each($(this.envelopeKnobs), function (i, el) {
            el.addEventListener('change', function () {
                slf.Digital7segMarker(el.value)
            })
        })
    }

    static ActivatePotentiometerLeds(led_potentiometer_pos) {
        $.each($('.leads_wave'), function (i, el) {
            $(el).removeClass('active');
        })
        var li = $('ul.glow > li > a');
        $(li[led_potentiometer_pos]).addClass('active');
        //console.log($(li[0]));
    }

    LoadDeviceVisualization() {
        // Demo Setup - Knobs

        var transformProp = getTransformProperty();

        var envelopeKnobStartPositions = [0, 40, 75, 85, 20, 55];
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

        return;

        var tensionKnobStartPositions = [0, 0, -80];
        var tensionKnobs = [...document.querySelectorAll('.fl-studio-envelope__knob.tension-knob')];
        var tensionKnobs = tensionKnobs.map((el, idx) => new KnobInput(el, {
            visualContext: function () {
                this.indicatorRing = this.element.querySelector('.indicator-ring');
                var ringStyle = getComputedStyle(this.element.querySelector('.indicator-ring-bg'));
                this.r = parseFloat(ringStyle.r) - (parseFloat(ringStyle.strokeWidth) / 2);
            },
            updateVisuals: function (norm) {
                var theta = Math.PI * 2 * norm + 0.5 * Math.PI;
                var endX = this.r * Math.cos(theta) + 20;
                var endY = this.r * Math.sin(theta) + 20;
                this.indicatorRing.setAttribute('d', `M20,20l0,-${this.r}A${this.r},${this.r},0,0,${norm < 0.5 ? 0 : 1},${endX},${endY}Z`);

            },
            min: -100,
            max: 100,
            initial: tensionKnobStartPositions[idx],
        }));

        // Demo Setup - Envelope Visualization

        var container = document.querySelector('.envelope-visualizer');
        var enveloperVisualizer = {
            container: container,
            shape: container.querySelector('.envelope-shape'),
            delay: container.querySelector('.delay'),
            attack: container.querySelector('.attack'),
            hold: container.querySelector('.hold'),
            decay: container.querySelector('.decay'),
            release: container.querySelector('.release'),
        };

        var updateVisualization = debounce(function (evt) {
            var maxPtSeparation = 75;
            var ptDelay = (maxPtSeparation * envelopeKnobs[0].value / 100);
            var ptAttack = ptDelay + (maxPtSeparation * envelopeKnobs[1].value / 100);
            var ptHold = ptAttack + (maxPtSeparation * envelopeKnobs[2].value / 100);
            var ptDecay = ptHold + (maxPtSeparation * envelopeKnobs[3].value / 100) * (100 - envelopeKnobs[4].value) / 100;
            var ptSustain = 100 - envelopeKnobs[4].value; // y value
            var ptRelease = ptDecay + (maxPtSeparation * envelopeKnobs[5].value / 100);
            // TODO: better tension visualization
            var tnAttack = (ptAttack - ptDelay) * tensionKnobs[0].value / 100;
            var tnDecay = (ptDecay - ptHold) * tensionKnobs[1].value / 100;
            var tnRelease = (ptRelease - ptDecay) * tensionKnobs[2].value / 100;
            enveloperVisualizer.shape.setAttribute('d',
                `M${ptDelay},100` +
                `C${tnAttack < 0 ? ptDelay - tnAttack : ptDelay},100,${tnAttack > 0 ? ptAttack - tnAttack : ptAttack},0,${ptAttack},0` +
                `L${ptHold},0` +
                `C${tnDecay > 0 ? ptHold + tnDecay : ptHold},0,${tnDecay < 0 ? ptDecay + tnDecay : ptDecay},${ptSustain},${ptDecay},${ptSustain}` +
                `C${tnRelease > 0 ? ptDecay + tnRelease : ptDecay},${ptSustain},${tnRelease < 0 ? ptRelease + tnRelease : ptRelease},100,${ptRelease},100`
            );
            enveloperVisualizer.delay.setAttribute('cx', ptDelay);
            enveloperVisualizer.attack.setAttribute('cx', ptAttack);
            enveloperVisualizer.hold.setAttribute('cx', ptHold);
            enveloperVisualizer.decay.setAttribute('cx', ptDecay);
            enveloperVisualizer.decay.setAttribute('cy', ptSustain);
            enveloperVisualizer.release.setAttribute('cx', ptRelease);
        }, 10);

        envelopeKnobs.concat(tensionKnobs)
            .forEach(knob => { knob.addEventListener('change', updateVisualization); });
        updateVisualization();

        var panelElement = document.querySelector('.fl-studio-envelope');
        var panel = {
            element: panelElement,
            originalTransform: getComputedStyle(panelElement)[transformProp],
            width: panelElement.getBoundingClientRect().width,
            height: panelElement.getBoundingClientRect().height,
        };
        var resizePanel = () => {
            var pw = (window.innerWidth - 40) / panel.width;
            var ph = (window.innerHeight - 40) / panel.height;
            var size = Math.min(pw, ph);
            if (size > 1.4) {
                size -= 0.4;
            } else if (size > 1) {
                size = Math.min(size, 1);
            }
            panel.element.style[transformProp] = `${panel.originalTransform} scale(${size})`;
        };
        window.addEventListener('resize', resizePanel);
        resizePanel();
    }

}



















