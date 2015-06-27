import spidev
import time
spi = spidev.SpiDev()
spi.open(0,0)
smoothedVal = 0 

def readadc(adcnum):
    if ((adcnum > 7) or (adcnum < 0)):
        return -1
    r = spi.xfer2([1,(8+adcnum)<<4,0])
    adcout = ((r[1]&3) << 8) + r[2]
    return adcout

def smoothValue(x):
    smoothedVal = 20 + (-0.025965 + (0.0000233054 + (-2.063*pow(10,-7) + 1.70016*pow(10,-8) *(-81 + x))* (-900 + x))* (-1.5 + x))*(-2890 + x)
    return smoothedVal

while True:
    adcInput = 0
    value = readadc(adcInput)
    smoothedVal = value
    print "---------------------------"
    print "ADC(", adcInput,")= ", smoothedVal
    print "---------------------------"
    time.sleep(4)
