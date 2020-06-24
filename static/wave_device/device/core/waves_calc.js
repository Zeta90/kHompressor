class WaveCalc {
    constructor(delta_t, samples) {

        this.delta_t = delta_t
        this.SAMPLES = samples
        this.TOTAL_SIMULATION_TIME = this.SAMPLES * this.delta_t
        this.TIME_MULTIPLIER = samples / this.TOTAL_SIMULATION_TIME

        //this.physics = Physics(delta_t, self.TIME_MULTIPLIER)

        this.x = []
        this.y = []
        this.v = []
        this.a = []

    }


    GenerateSignalValues(signal_type, signal_data){
        this.x = []
        this.y = [0]
        this.v = [0]
        this.a = [0]

        if(signal_type == 1){
            offset_time = parseFloat(signal_data[0])
            s_on_time = this.TOTAL_SIMULATION_TIME - offset_time
            s_off_time = 0
            amp = parseFloat(signal_data[1])
            this.x, this.y, this.v, thisself.a = this.BasicSignals(
                0, offset_time, s_on_time, s_off_time, amp
            )
        }else if(signal_type == 2){
            offset_time = parseFloat(signal_data[0])
            s_on_time = parseFloat(signal_data[1])
            s_off_time = parseFloat(signal_data[2])
            amp = parseFloat(signal_data[3])
            this.x, this.y, this.v, this.a = this.BasicSignals(
                1,offset_time, s_on_time, s_off_time, amp
            )
        }else if(signal_type == 2){
            offset_time = parseFloat(signal_data[0])
            s_on_time = parseFloat(signal_data[1])
            s_off_time = parseFloat(signal_data[2])
            amp = parseFloat(signal_data[3])
            this.x, this.y, this.v, this.a = this.BasicSignals(
                2,offset_time, s_on_time, s_off_time, amp
            )
        return this.x, this.y, this.v, this.a
        }
    }

    BasicSignals(signal, offset_time, s_on_time, s_off_time, amp) {
        var i = 0;
        var j = 0;

        var with_down_state = True
        var stepped = False
        var triangle = False

        var curr_point = 0
        var offset_samples = offset_time / self.delta_t

        var counter = 0
        var amplif = 0

        if (signal == 0) {
            with_down_state = False
        } else if (signal == 1) {
            stepped = True
        }

        while (counter < this.TOTAL_SIMULATION_TIME) {
            if (counter == 0) {
                curr_point += offset_time
                for (i = 0; i < parseInt(offset_time / this.delta_t); i++) {
                    this.y.push(0)
                }
                counter += 1
            } else {
                amplif = amp
                curr_point += s_on_time
                for (i = 0; i < parseInt(s_on_time / this.delta_t); i++) {
                    if (stepped == true) {
                        amplif = counter;
                    } else if (triangle == true) {
                        amplif = i
                    }
                    self.y.psuh(amplif)

                    if (with_down_state == true) {
                        amplif = 0;
                        if (stepped == true) {
                            amplif = counter;
                        } else if (triangle == true) {
                            amplif = 0
                        }
                        curr_point += s_off_time
                        for (i = 0; i < parseInt(s_off_time / this.delta_t); i++) {
                            this.y.push(amplif)
                        }
                    }

                    if (curr_point < this.TOTAL_SIMULATION_TIME) {
                        counter += 1;
                    } else {
                        break;
                    }
                }


            }

        }

        this.y = this.y.slice(this.SAMPLES);

        while (j < this.SAMPLES) {
            if (j < offset_samples - 1) {
                this.x = j * this.delta_t
                this.v = 0
                this.a = 0
                this.x.append(this.x)
                this.v.append(this.v)
                this.a.append(this.a)
                j += 1
            } else {
                this.x = j * this.delta_t
                this.v = 0
                this.a = 0
                this.x.append(this.x)
                this.v.append(this.v)
                this.a.append(this.a)
                j += 1
            }
        }
        return this.x, this.y, this.v, this.a
    }
}