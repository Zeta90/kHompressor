from scipy import fftpack
import numpy as np
class Fourier:
    def frequecies_spectrum(self, response,samplingF):
        #print(response)
        samplingFrequency = samplingF
        fourierTransform = np.fft.fft(response)/len(response)
        fourierTransform = fourierTransform[range(int(len(response)/2))] # Exclude sampling frequency
       
        tpCount     = len(response)
        values      = np.arange(int(tpCount/2))
        timePeriod  = tpCount/samplingFrequency
        frequencies = values/timePeriod
        #print(frequencies)
        # X = fftpack.fft(response)
        # freqs = fftpack.fftfreq((len(response))) * 100

        # fig, ax = plt.subplots()

        # ax.stem(freqs, np.abs(response))
        # ax.set_xlabel('Frequency in Hertz [Hz]')
        # ax.set_ylabel('Frequency Domain (Spectrum) Magnitude')
        # ax.set_xlim(-f_s / 2, f_s / 2)
        # ax.set_ylim(-5, 110)
        #print(frequencies)
        return [(fourierTransform),frequencies]