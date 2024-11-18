import os
import csv

def create_csv_from_folders(base_dir, output_csv):
    # Data structure to organize data
    data = {}

    # Traverse folders
    for folder in os.listdir(base_dir):
        folder_path = os.path.join(base_dir, folder)
        if os.path.isdir(folder_path):
            # Extract firstName and secondName
            try:
                first_name, second_name = folder.split("--")
            except ValueError:
                print(f"Skipping folder with invalid format: {folder}")
                continue
            
            # Ensure firstName is in data
            if first_name not in data:
                data[first_name] = {}
            
            # Traverse files in the folder
            for file in os.listdir(folder_path):
                if file.endswith(".txt"):
                    file_path = os.path.join(folder_path, file)
                    # Extract thirdName
                    try:
                        _, _, third_name = file.split("--")
                        third_name = third_name.replace(".txt", "")
                    except ValueError:
                        print(f"Skipping file with invalid format: {file}")
                        continue

                    # Read file content (numbers)
                    try:
                        with open(file_path, 'r') as f:
                            numbers = [line.strip() for line in f.readlines()]
                    except Exception as e:
                        print(f"Error reading file {file_path}: {e}")
                        continue

                    # Add to data structure
                    if second_name not in data[first_name]:
                        data[first_name][second_name] = {}
                    data[first_name][second_name][third_name] = numbers

    # Create CSV structure
    with open(output_csv, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        
        # Write header row (firstName)
        header = []
        for first_name in data.keys():
            header.append(first_name)
        writer.writerow(header)

        rows = []
        for first_name, second_names in data.items():
            for second_name, third_names in second_names.items():
                for third_name, numbers in third_names.items():
                    row = [first_name, second_name, third_name] + [number.replace(".", ",") for number in numbers]
                    rows.append(row)
        transposed_data = list(map(list, zip(*rows)))
        for row in transposed_data:
            writer.writerow(row)

# Example usage
base_dir = "/Users/dawidszczepankowski/Documents/Studia/projekt-dyplomowy/ngss-example/calculations/dispatch-mean-time/45-initial-30-changes"
output_csv = "output.csv"
create_csv_from_folders(base_dir, output_csv)
