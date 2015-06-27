import spidev
import time
import datetime
spi = spidev.SpiDev()
spi.open(0,0)

# mongo_hello_world.py
# Author: Bruce Elgort
# Date: March 18, 2014
# Purpose: To demonstrate how to use Python to
# 1) Connect to a MongoDB document collection
# 2) Insert a document
# 3) Display all of the documents in a collection

from pymongo import MongoClient
MONGODB_URI = 'mongodb://deeach:deeach@localhost:27017/apartament' 
def readadc(adcnum):
    if ((adcnum > 7) or (adcnum < 0)):
        return -1
    r = spi.xfer2([1,(8+adcnum)<<4,0])
    adcout = ((r[1]&3) << 8) + r[2]
    return adcout

while True:
    temperature = readadc(1)
    luminosity = readadc(2)
    humidity = readadc(0)
    voltage = temperature * 3.3
    voltage /= 1024.0
    tempCelsius = (voltage-0.5)*100
    connection = MongoClient(MONGODB_URI)
    db = connection.apartament.todos
    now=datetime.datetime.now()
    temp_record = {'temperature':tempCelsius,'luminosity':luminosity,'humidity':humidity,'time':now}
    db.insert(temp_record)
    connection.close()
    
    print "---------------------------"
    print "READ "
    print "---------------------------"
    print "Temp: ", tempCelsius
    print "---------------------------"
    print "Luminosity: ", luminosity
    print "---------------------------"
    print "Humidity: ", humidity
    print "---------------------------"
    print "Time: ", now
    time.sleep(600)


