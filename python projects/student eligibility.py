import re
d={}
ai=set()
iot=set()
cloud=set()
elec=['AI','IOT','CLOUD']

def digit_sum(n):
    if n==0:
        return 0
    else:
        return (n%10)+digit_sum(n//10)

def marks(a,b,c):

    total=a+b+c
    avg=round(total/3,2)
    print('total marks = ',total)
    print('average = ',avg)
    return avg

def add():
    name=input('name=')
    reg=input('reg no. = ')
    email=input('enter your email id = ')

    a=int(input('enter your maths marks = '))
    b=int(input('enter your science marks ='))
    c=int(input('enter your CS marks = '))

    e1=input('elective 1 :')
    e2=input('elective 2 :')

    avg=marks(a,b,c)

    pattern=r'^[A-Za-z0-9._%+-]+@vitstudent\.ac\.in$'
    if re.match(pattern,email):
        print('valid')
    else:
        print('invalid')
        return
    d[reg]={'name':name,'email':email,'avg':avg,'elec':{e1,e2}}

    digit=''
    for i in reg:
        if i.isdigit():
            digit+=i
        else:
            pass

    for i in d:
        if 'AI' in d[reg]['elec']:
            ai.add(d[reg]['name'])

        if 'CLOUD' in d[reg]['elec']:
            cloud.add(d[reg]['name'])

        if 'IOT' in d[reg]['elec']:
            iot.add(d[reg]['name'])

    s=digit_sum(int(digit))

    print('student added successfully')
    print('register digit sum = ',s)

def add_elec():
    reg=input('enter your reg no = ')
    e=input('enter your elective = ')
    if reg not in d:
        print('student not found')
        return
    else:
        d[reg]['elec'].add(e)

        if e == 'AI':
            ai.add(d[reg]['name'])
        elif e == 'IOT':
            iot.add(d[reg]['name'])
        elif e == 'CLOUD':
            cloud.add(d[reg]['name'])

        print('elective added')

def show():
    if d=={}:
        print('\nno data\n')
    for i,j in d.items():
        print('reg',i,'->','details',j)
def commonElec():
    print(ai)
    print(iot)
    print(cloud)

def sort():
    sortstu=sorted(d.items(),key=lambda x:x[1]['avg'])
    print('SORTED STUDENTS:')
    for i in sortstu:
        print(i)

def eligible():
    e=[]
    for i in d:
        if d[i]['avg']>80:
            e.append(d[i]['name'])
        else:
            pass

    print('ELEGIBLE STUDENTS:')
    for i in e:
        print(i)

while True:
    print('1.add student\n2.add elective\n3.common electives\n4.eligible students\n5.sort students\n6.show details of present students\n7.exit')
    
    choice=int(input('enter your choice = '))
    if choice==1:
        add()
    elif choice==2:
        add_elec()
    elif choice==3:
        commonElec()
    elif choice==4:
        eligible()
    elif choice==5:
        sort()
    elif choice==6:
        show()
    elif choice==7:
        print('thank you')
        break
