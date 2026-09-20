import re
available_books = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
students = {}

def digit_sum(n):
    if n == 0:
        return 0
    return (n % 10) + digit_sum(n // 10)

def add_student():

    reg = input("Enter register number: ")
    name = input("Enter name: ")
    email = input("Enter email ID: ")

    pattern = r'^[A-Za-z0-9._%+-]+@vitstudent\.ac\.in$'

    if re.match(pattern, email):
        print("Valid college email")
    else:
        print("Invalid college email")
        return

    digits = ""

    for x in reg:
        if x.isdigit():
            digits += x

    if digits == "":
        print("Register number must contain digits")
        return

    s = digit_sum(int(digits))
    reference = name[:2].upper() + "_" + str(s)

    students[reg] = {
        "name": name,
        "email": email,
        "books": set(),
        "reference": reference
    }

    print("Student added successfully")
    print("Reference code:", reference)

def issue_book():

    reg = input("Enter register number: ")

    if reg not in students:
        print("Student not found")
        return

    if len(available_books) == 0:
        print("No books are currently available")
        return

    book = int(input("Enter book ID: "))

    if book not in available_books:
        print("Book is not available")
        return

    if len(students[reg]["books"]) >= 3:
        print("Student cannot borrow more than 3 books")
        return

    students[reg]["books"].add(book)
    available_books.remove(book)

    print("Book issued successfully")

def return_book():

    reg = input("Enter register number: ")

    if reg not in students:
        print("Student not found")
        return

    book = int(input("Enter book ID: "))

    if book not in students[reg]["books"]:
        print("This student has not borrowed this book")
        return

    students[reg]["books"].remove(book)
    available_books.add(book)

    print("Book returned successfully")

def display_borrowed_books():

    reg = input("Enter register number: ")

    if reg not in students:
        print("Student not found")
        return

    books = students[reg]["books"]

    print("Student:", students[reg]["name"])
    print("Borrowed books:", books)

def count_books():

    reg = input("Enter register number: ")

    if reg not in students:
        print("Student not found")
        return

    count = len(students[reg]["books"])

    print("Number of books borrowed:", count)



def common_books():

    reg1 = input("Enter first student's register number: ")
    reg2 = input("Enter second student's register number: ")

    if reg1 not in students or reg2 not in students:
        print("Student not found")
        return

    books1 = students[reg1]["books"]
    books2 = students[reg2]["books"]

    common = books1 & books2

    print("Books borrowed by both students:", common)

def books_borrowed_by_one():

    count = {}

    for student in students.values():

        for book in student["books"]:

            if book not in count:
                count[book] = 1
            else:
                count[book] += 1

    result = set()

    for book in count:
        if count[book] == 1:
            result.add(book)

    print("Books borrowed by only one student:", result)


def show_available_books():

    print("Currently available books:", available_books)

def sort_students():

    sorted_students = sorted(
        students.items(),
        key=lambda x: len(x[1]["books"])
    )

    print("\nStudents sorted by number of borrowed books:")

    for reg, details in sorted_students:

        print(
            reg,
            details["name"],
            "->",
            len(details["books"]),
            "books"
        )

def eligible_students():

    print("\nStudents eligible to borrow additional books:")

    found = False

    for reg, details in students.items():

        valid_email = re.match(
            r'^[A-Za-z0-9._%+-]+@vitstudent\.ac\.in$',
            details["email"]
        )

        fewer_than_3 = len(details["books"]) < 3

        book_available = len(available_books) > 0

        if valid_email and fewer_than_3 and book_available:

            print(reg, "->", details["name"])
            found = True

    if not found:
        print("No eligible students")

while True:

    print("\n========== COLLEGE LIBRARY SYSTEM ==========")

    print("1. Add student")
    print("2. Issue a book")
    print("3. Return a book")
    print("4. Display borrowed books")
    print("5. Calculate number of borrowed books")
    print("6. Books borrowed by two students")
    print("7. Books borrowed by only one student")
    print("8. Display available books")
    print("9. Sort students by borrowed books")
    print("10. Display eligible students")
    print("11. Exit")

    choice = int(input("Enter your choice: "))

    if choice == 1:
        add_student()

    elif choice == 2:
        issue_book()

    elif choice == 3:
        return_book()

    elif choice == 4:
        display_borrowed_books()

    elif choice == 5:
        count_books()

    elif choice == 6:
        common_books()

    elif choice == 7:
        books_borrowed_by_one()

    elif choice == 8:
        show_available_books()

    elif choice == 9:
        sort_students()

    elif choice == 10:
        eligible_students()

    elif choice == 11:
        print("Thank you!")
        break

    else:
        print("Invalid choice")