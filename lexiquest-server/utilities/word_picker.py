from datetime import datetime

def get_daly_word_index(word_count: int):
    current_date = datetime.now()
    current_year = current_date.year
    day_of_year = current_date.timetuple().tm_yday
    return ((current_year * 366) + day_of_year - 1) % word_count