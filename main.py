# -*- coding: utf-8 -*-
"""
Created on Sun Jan 16 11:06:56 2022

@author: Aditya & Shravan
"""
import eel
import python_weather
import asyncio
import fuzzywuzzy
import pyowm
import requests
from unsplash.api import Api as unsplash_api
from unsplash.auth import Auth as unsplash_auth


import api_keys


eel.init("web")

weather_api = pyowm.OWM(api_keys.weather_api_key).weather_manager()

@eel.expose
def get_weather(city_name):
    weather_obs = weather_api.weather_at_place(city_name)
    weather_data = weather_obs.weather
    
    temp = weather_data.temperature('celsius')
    humidity = weather_data.humidity 
    wind = weather_data.wind()  
    cloud = weather_data.clouds
    rain = weather_data.rain
    print('wind',wind)
    print('cloud',cloud)
    print('rain',rain)
    return city_name, temp, cloud, wind


@eel.expose    
def get_new_picture(city_name):
    unsplash_auth_token = unsplash_auth(api_keys.unplash_access_key, api_keys.unsplash_secret_key, api_keys.unsplash_redirect_uri)
    unsplash_api_call = unsplash_api(unsplash_auth_token)
    pic = unsplash_api_call.search.photos(city_name)['results'][0]

    return pic.id

def weather_forcast(city_name):
    pass

#@eel.expose
def weather_update(time_update):
    pass


#@eel.expose
def push_notification():
    pass

if __name__ == "__main__":
    eel.start('index.html')
    #print(get_new_picture('Toronto'))
    
    print(api_keys.weather_api_key)
    x = get_weather('orlando')
    for i in x:
        try:
            for j in i:
                print(j,i[j])
        except:
            print(i)
    #loop = asyncio.get_event_loop()
    #loop.run_until_complete(get_weather("Toronto"))