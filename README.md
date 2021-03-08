## Log output transformator utility

This utility saves your time by transforming array-like log output into parameters string.  
It is useful for developers and testers who need to insert parameters manually in API testing tools everytime.

### Supported output types:
* GET PARAMETERS URL STRING
* JSON STRING

### Example:
You have this kind of output in your logs:

`[name] => Vladimir`  
`[patronymic] => Viktorovich`  
`[surname] => Kaban`  
`[weight] => 85`  
`[hairType] => Straight`  
`[hairColor] => Brown`  
`[age] => 20`  
`[gender] => male`  
`[sports] => swimming`  
`[foreignLanguages] => English, Spanish, Deutsch`  
`[childrenQuantity] => 0`  
`[motherTongue] => Russian`  
`[nationality] => Russian`  
`[citizenship] => Russian Federation`  
`[hobbies] => music, drawing`

or this:

`[name] => Vladimir  
[patronymic] => Viktorovich  
[surname] => Kaban  
[weight] => 85  
[hairType] => Straight  
[hairColor] => Brown  
[age] => 20  
[gender] => male  
[sports] => swimming  
[foreignLanguages] => English, Spanish, Deutsch  
[childrenQuantity] => 0  
[motherTongue] => Russian  
[nationality] => Russian  
[citizenship] => Russian Federation  
[hobbies] => music, drawing`

or even: 
`[name]=>Vladimir[patronymic]=>Viktorovich[surname]=>Kaban[weight]=>85[hairType]=>Straight[hairColor]=>Brown[age]=>20[gender]=>male[sports]=>swimming[foreignLanguages]=>English, Spanish, Deutsch[childrenQuantity]=>0[motherTongue]=>Russian[nationality]=>Russian[citizenship]=>Russian Federation[hobbies]=> music, drawing`

And you want to send request to API with the same parameters in case of testing for example.  
To make it fast (if you are able to run `Node.js`):
1) Run `LogTransformator.js` via `Node.js` directly or in `IDE`
2) In Terminal enter output type, `json` or `get`
3) In Terminal insert your logs
4) Copy output string and insert into API testing tool which will automaticaly pin parameters to request![nodejs](https://user-images.githubusercontent.com/37748474/110335835-543f7900-8035-11eb-84de-a10c34fd803e.png)


To make it fast (If there's no `Node.js`):
1) Insert needed data type into `outputTypeString` variable in `LogTransformator.js`![insertingDataType](https://user-images.githubusercontent.com/37748474/110333953-4557c700-8033-11eb-8f57-7e9c311d4d60.png)
2) Insert data to transform into `inputStringData` variable ![insertingData](https://user-images.githubusercontent.com/37748474/110334442-d5960c00-8033-11eb-925b-d19be062c643.png)
3) Copy this code and run in your Browser console or other js interpreter![success](https://user-images.githubusercontent.com/37748474/110335058-856b7980-8034-11eb-80a4-49b0e6c5cf1f.png)

4) Copy output string and insert into API testing tool (Postman, Insomnia, etc.) which will automaticaly pin parameters to request![postman](https://user-images.githubusercontent.com/37748474/110335285-bba8f900-8034-11eb-963a-fa7a2cefa092.png)
