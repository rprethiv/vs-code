n=int(input('no of people = '))
d={}
l=0
m=0
h=0
wt=['underweight','normalweight','overweight']
bp=[ 'Low blood pressure','normal blood pressure','High blood Pressure']
hr=['low resting','normal resting','high resting']
for i in range(1,n+1):
    bmi=0
    print('\nenter the details of the person',i)
    a=input("enter blood pressure in the form of 'systolic/diastolic' = ")
    b=int(input('enter the heartrate of the person = '))
    c=int(input('weight of the person (kg) = '))
    e=float(input('height of the person (m) = '))
    bmi=c/(e**2)
    d[i]={'bp':a,'hr':b,'we':c,'he':e,'bmi':bmi}

c=0
for i in range(1,n+1):
    c=0
    print('\nthe bmi of the person',i,'is',d[i]['bmi'])
    if d[i]['bmi']<18.5:
        print(wt[0])
    elif d[i]['bmi']>=18.5 and d[i]['bmi']<24.9:
        print(wt[1])
    else:
        c+=1
        print(wt[2])
    print('the blood pressure of the person',i,'is',d[i]['bp'])
    z=d[i]['bp'].index('/')
    x=int(d[i]['bp'][0:z])
    y=int(d[i]['bp'][z+1:])
    if x<90 and y<60:
        print(bp[0])
    elif 90<=x<=120 and 60<=y<=80:
        print(bp[1])
    else:
        c+=1
        print(bp[2])
    print('the heartrate of the person',i,'is',d[i]['hr'])
    if d[i]['hr']<60:
        print(hr[0])
    elif d[i]['hr']>=60 and d[i]['hr']<100:
        print(hr[1])
    else:
        c+=1
        print(hr[2])
    if c>=2:
        print('the health of the person',i,'is in high risk')
    else:
        print('the health of the person',i,'is in low risk')
        
        
        
    
        
