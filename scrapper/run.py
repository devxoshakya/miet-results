import json

# Load the student details from the first file
with open('btech_db.json', 'r') as details_file:
    student_details = json.load(details_file)

# Load and correct the SGPA data from the text file
sgpa_data = []
with open('resolved.txt', 'r') as sgpa_file:
    content = sgpa_file.read()
    # Correcting format by adding commas and making it a valid JSON array
    corrected_content = "[" + content.replace("}\n{", "},{").strip() + "]"
    sgpa_data = json.loads(corrected_content)


# Create a dictionary for quick lookup of student details by roll number
details_dict = {student['rollNo']: student for student in student_details}

# Combine the data based on the common roll numbers
combined_data = []
for sgpa in sgpa_data:
    roll_no = sgpa['rollNo']
    if roll_no in details_dict:
        combined_student = details_dict[roll_no]
        combined_student.update(sgpa)
        combined_data.append(combined_student)

# Write the combined data to a new JSON file
with open('combined_student_data.json', 'w') as combined_file:
    json.dump(combined_data, combined_file, indent=4)

print("Combined data has been written to 'combined_student_data.json'")
