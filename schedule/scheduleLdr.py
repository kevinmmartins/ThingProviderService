import schedule
import requests
import time

URL = "http://localhost:3002/route/LDREndpoint"
URL_ERROR = "http://localhost:3002/route/LDREndpointWithError"
POST_ON = "http://localhost:3002/route/ReleEndpoint?params=1"
POST_OFF = "http://localhost:3002/route/ReleEndpoint?params=0"


def job_route_1():
    print("Chamando rota com sucesso")
    r = requests.get(url=URL)
    if r and r.status_code == 200:
        check_return(r.json())


def job_route_2():
    print("Chamando rota com erro")
    r = requests.get(url=URL_ERROR)
    if r and r.status_code == 200:
        check_return(r.json())


def check_return(json):
    print(json)
    if int(json.get("ldr")) < 20:
        print("Acendendo")
        requests.put(url=POST_ON)
    else:
        print("Apagando")
        requests.put(url=POST_OFF)


schedule.every(2).seconds.do(job_route_1)
schedule.every(7).seconds.do(job_route_2)

while True:
    schedule.run_pending()
    time.sleep(1)
