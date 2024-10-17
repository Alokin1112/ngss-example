import os
import shutil

def copy_template(destination, template, numOfCopies):
    # Sprawdź czy plik szablonu istnieje
    if not os.path.isfile(template):
        print(f"Błąd: Plik szablonu '{template}' nie istnieje.")
        return
    
    # Tworzenie folderu docelowego, jeśli nie istnieje
    if not os.path.exists(destination):
        os.makedirs(destination)
    
    # Otwórz plik szablonu i wczytaj zawartość
    with open(template, 'r') as file:
        template_content = file.read()
    
    # Wykonuj kopiowanie i modyfikację dla każdej iteracji
    for i in range(1, numOfCopies + 1):
        # Zmień w treści pliku szablonu {Param} na numer iteracji
        modified_content = template_content.replace("{Param}", str(i))
        
        # Określ nazwę pliku wynikowego
        file_name = os.path.split(template)[-1].replace(".ts", "") 
        output_file = os.path.join(destination, f'{file_name}_{i}.ts')
        
        # Zapisz zmodyfikowany szablon do nowego pliku
        with open(output_file, 'w') as file:
            file.write(modified_content)
        
        print(f'Utworzono: {output_file}')

# Przykład użycia
destination_path = 'G:\\Szkola\\Studia\\ngss\\src\\app\\store\\multiple\\copies'
template_path = 'G:\\Szkola\\Studia\\ngss\src\\app\store\\multiple\\template\\multiple-test.store.reducer.ts'
num_of_copies = 300
className = "MultipleReducer"


copy_template(destination_path, template_path, num_of_copies)

for i in range(1, num_of_copies + 1):
  print(className + str(i)+ ',')
    # print(className+str(i)+": " + className + str(i)+",")