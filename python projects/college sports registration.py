import re
sid={1,2,3,4,5,6,7,8,9}
regi=set()
d={}

def dsum(n):
    if n==0:
        return 0
    else:
        return (n%10)+dsum(n//10)
def add():
    reg=input('enter your reg no. = ')
    name=input('enter your name = ')
    email=input('enter your email id = ')

    pat=r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

    if re.match(pat,email):
        print('valid')
    else:
        print('invalid')
        return

    d[reg]={'name':name,'email':email,'event':set()}

    s=''
    for i in reg:
        if i.isdigit():
            s+=i
        else:
            pass
    x=dsum(int(s))
    ref=name[:2].upper()+'-'+str(x)
    print('refference code = ',ref)
    print('\nadded sucessfully\n')

def reg():
    reg=input('enter your reg no. = ')

    if reg not in d:
        print('student not found')
        return
    else:
        a=int(input('enter the event id = '))
        if a in sid and len(d[reg]['event'])<3:
            d[reg]['event'].add(a)
            sid.remove(a)

            print('\nevent registered\n')

        else:
            print('event not available for u')
        

def cancel():
    reg=input('enter your reg no. = ')
    if reg not in d:
        print('student not found')
    else:
        a=int(input('enter the event id to cancel = '))
        if a not in d[reg]['event']:
            print('event not registered')
        else:
            d[reg]['event'].remove(a)
            sid.add(a)
            print('\nevent removed\n')
def disp():
    reg=input('enter your reg no. = ')
    if reg in d:
        print('your event id = ',d[reg]['event'])
    else:
        print('student not found')
def countevent():
    reg=input('enter your reg no. = ')

    if reg in d:
        print('number of events =',len(d[reg]['event']))
    else:
        print('student not found')

def sort():
    a=sorted(d.items(),key=lambda x:len(x[1]['event']),reverse=True)
    print('sorted events based on the no of events :')
    for i in a:
        print(i)

def com1():
    a={}
    for i in d.values():
        for j in i['event']:
            if j not in a:
                a[j]=1
            else:
                a[j]+=1
    res=set()
    for i in a:
        if a[i]==1:
            res.add(i)
        else:
            pass
    print('\nsports selected by one student = \n',res)

def com2():
    reg1=input('enter first reg no. = ')
    reg2=input('enter second reg no. = ')

    if reg1 not in d or reg2 not in d:
        print('student not found')
        return

    a=d[reg1]['event']
    b=d[reg2]['event']
    
    print('common events =',a & b)
print('1.add student\n2.register event\n3.cancel event\n4.display the registered sports\n5.no of event for the student\n6.sort students based on the no of events\n7.event common to 1 student\n8.event common to 2 student\n9.exit\n')
while True:
    a=int(input('enter your choice = '))
    if a==1:
        add()
    elif a==2:
        reg()
    elif a==3:
        cancel()
    elif a==4:
        disp()
    elif a==5:
        countevent()
    elif a==6:
        sort()
    elif a==7:
        com1()
    elif a==8:
        com2()
    elif a==9:
        break
    else:
        print('invalid input\nTry again')