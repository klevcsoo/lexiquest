from schema.wordbase import WordBase

def read_dictionary_file(file_name):
    word_list = []

    try:
        with open(file_name, 'r', encoding='utf-8') as file:
            for line in file:
                word_name=line.rstrip()
                word = WordBase(content=word_name, length= len(word_name))
                word_list.append(word)

    except FileNotFoundError:
        print(f"The {file_name} file not found.")

    return word_list
