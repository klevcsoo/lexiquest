import requests
import routes.user as user
import routes.validate as validate
import routes.word as word
import models
import database
import asyncio
import schema.guess as guess
import schema.userbase as ub
import utilities.word_picker as wp
import sqlalchemy as sa

class Test():
    async def test_user(dat:user.db_dependency):
        # leteszteljuk a felhasznalok letrehozasat
        s = await user.create_user("akombakom", dat)
        print(s)
        

    async def test_validate(dat:validate.db_dependency):
        # letrehoz egy tester_1 nevu felhasznalot, es azon kiprobalja
        # az osszes validate metodust
        db_user = dat.query(models.User).filter(models.User.name == "tester").first()
        words = dat.query(models.Word).all()
        g = guess.Guess
        g.uid = db_user.id
        g.word = words[wp.get_daly_word_index(len(words))].content
        s1 = await validate.validatetion(g,dat)
        s2 = await validate.get_current_day()
        s3 = await validate.get_user_today_attempts(db_user.id,dat)
        print(s1, s3, sep = "\n")
        dat.query(models.Validate)
        

    async def test_word(dat:word.db_dependency):
        # letrehoz egy tester_1 nevu felhasznalot, es azon kiprobalja
        # az osszes word metodust
        db_user = dat.query(models.User).filter(models.User.name == "tester").first()
        #s = await word.get_daily_word(db_user.id,dat)
        #print(s)
        num_of_row = dat.query(models.Word).count()
        words = dat.query(models.Word).all()
        print(words[wp.get_daly_word_index(num_of_row)].content)

    async def clear():
        # torli az osszes adatot
        dat = next(user.get_db())
        dat.query(models.Validate).delete(synchronize_session=False)
        dat.query(models.Log).delete(synchronize_session=False)
        dat.query(models.User).delete(synchronize_session=False)
        dat.commit()
        
            

def main():
    #asyncio.run(Test.clear())
    dat = next(validate.get_db())
    #user = ub.UserBase(name="tester")
    #db_user = models.User(**user.dict())
    #dat.add(db_user)
    #dat.commit()
    asyncio.run(Test.test_user(dat))
    asyncio.run(Test.test_validate(dat))
    asyncio.run(Test.test_word(dat))
    asyncio.run(Test.clear())
    
    

if __name__ == "__main__":
    main()