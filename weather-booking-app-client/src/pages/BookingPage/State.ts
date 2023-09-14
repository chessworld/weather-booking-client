
/*
    Current supported states.
    example state location (tested):
    ACT: 25 Hobart avenue
    NSW: 34 Karrabah rd
    NT: 19 Lorna lim terrance
    QLD: 41 Raff st
    SA: 29 Torrens rd
    TAS: 35 cove hill rd
    VIC: 213 Clayton road
    WA: 5 Read Avenue
    
*/

/*
source: https://gist.github.com/calebgrove/c285a9510948b633aa47
Modified for typescript--
usage: 
abbrState('New South Wales', 'abbr') -> 'NSW'
abbrState('nsw', 'name') -> 'New South Wales'
*/
export function abbrState(input: string, to: string): string | null{

    
    var states = [
        ['Australian Capital Territory', 'ACT'],
        ['New South Wales', 'NSW'],
        ['Northern Territory', 'NT'],
        ['Queensland', 'QLD'],
        ['South Australia', 'SA'],
        ['Tasmania', 'TAS'],
        ['Victoria', 'VIC'],
        ['Western Australia', 'WA']
        
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(let i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }    
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(let i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }    
    }

    return null
}
