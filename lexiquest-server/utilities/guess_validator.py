def get_validation_result(str1, str2):
    eredmeny = []
    for char1 in str1:
        if char1 in str2:
            if str1.index(char1) == str2.index(char1):
                eredmeny.append("1")
            else:
                eredmeny.append("0")
        else:
            eredmeny.append("-1")
    
    return ";".join(eredmeny)