# This convert resolved_data.txt into a JSON file

import json

def convert_txt_to_json(input_file, output_file):
    try:
        with open(input_file, 'r') as file:
            content = file.read().strip()
            # Correcting format by adding commas and making it a valid JSON array
            corrected_content = "[\n" + content.replace("}\n{", "},\n{") + "\n]"
            sgpa_data = json.loads(corrected_content)
        
        with open(output_file, 'w') as json_file:
            json.dump(sgpa_data, json_file, indent=4)
        
        print(f"Converted content has been written to '{output_file}'")
    except json.JSONDecodeError as e:
        print(f"JSONDecodeError: {e.msg}")
        print(f"Error at line {e.lineno}, column {e.colno}, char {e.pos}")
    except Exception as e:
        print(f"An error occurred: {e}")

convert_txt_to_json('resolved_data.txt', 'students.json')