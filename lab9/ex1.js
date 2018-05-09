// 1. all zip codes in IA
db.zips.aggregate([ 
    {$match: {state: 'IA'}},
    {$group: {
        _id: "$state",
        zipcodes: {$addToSet: '$_id'}}},
    {$project: {
        _id: 0,
        state: '$_id',
        zipcodes: 1
    }}
])

// 2. all zip codes with population less than 1000
db.zips.aggregate([
    {$match: {pop: {$lt: 1000}}},
    {$group: {
        _id: null,
        zipcodes: {$addToSet: '$_id'}
    }},
    {$project: {
        _id: 0,
        zipcodes: 1
    }}
])

// 3. all cities having more than 1 zip codes, sort by state and city
db.zips.aggregate([
    {$group: {
        _id: {state: '$state', city: '$city'},
        countZipcode: {$sum: 1}
    }},
    {$match: {
        countZipcode: {$gt: 1}
    }},
    {$project: {
        _id: 0,
        state: '$_id.state',        
        city: '$_id.city',
        countZipcode: 1
    }},    
    {$sort: {
        state: 1, city: 1
    }}
])

// 4. the least populated city in each state
db.zips.aggregate([
    {$group: {
        _id: {state: '$state', city: '$city'},
        population: {$sum: '$pop'}
    }},
    {$sort: {
        '_id.state': 1,
        population: 1
    }},
    {$group: {
        _id: '$_id.state',
        city: {$first: '$_id.city'},
        population: {$first: '$population'}
    }},
    {$project: {
        _id: 0,
        state: '$_id',
        city: 1,
        population: 1
    }},
    {$sort: {state: 1}}
])