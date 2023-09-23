def get_validation_result(str1, str2):
    eredmeny = []
    i=0
    for char1 in str1:
        if char1 in str2:
            if str1[i] == str2[i]:
                eredmeny.append("1")
            else:
                eredmeny.append("0")
        else:
            eredmeny.append("-1")
        i = i+1
    
    return ";".join(eredmeny)