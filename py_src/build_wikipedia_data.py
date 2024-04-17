import json
import wikipediaapi
import os
from utils import File, Log, TimeFormat
from gig import Ent, EntType
log = Log('build_wikipedia_data')
ELECTION_LIST = [
      ("Presidential", "2024-10-24"),
      ("Presidential", "2019-11-16"),
      ("Presidential", "2015-01-08"),
      ("Presidential", "2010-01-26"),
      ("Presidential", "2005-11-17"),
      ("Presidential", "1999-12-21"),
      ("Presidential", "1994-11-09"),
      ("Presidential", "1988-12-19"),
      ("Presidential", "1982-10-20"),    
      ("Parliamentary", "2025-08-05"),
      ("Parliamentary", "2020-08-05"),
      ("Parliamentary", "2015-08-17"),
      ("Parliamentary", "2010-04-08"),
      ("Parliamentary", "2004-04-02"),
      ("Parliamentary", "2001-12-05"),
      ("Parliamentary", "2000-10-10"),
      ("Parliamentary", "1994-08-16"),
      ("Parliamentary", "1989-02-15"),
]

def clean(x):
      x = x.replace('.', '. ')
      x = x.replace('  ', '\n')
      return x 

def get_election_wiki_page_name_list():
    wiki_page_name_list = []
    for election_type, date_str in ELECTION_LIST:
        year_str = date_str.split('-')[0]
        wiki_page_name = f'{year_str}_Sri_Lankan_{election_type.lower()}_election'
        wiki_page_name_list.append(wiki_page_name)
    return wiki_page_name_list


def get_electoral_district_wiki_page_name_list():
    ed_ents = Ent.list_from_type(EntType.ED)
    wiki_page_name_list = []
    for ent in ed_ents:
        name_snake = ent.name.replace(' ', '_')
        wiki_page_name = f'{name_snake}_Electoral_District'
        wiki_page_name_list.append(wiki_page_name)
    return wiki_page_name_list 

def main():
    var_name = 'WIKIPEDIA_SUMMRY_IDX'
    time_str = TimeFormat.TIME.formatNow
    lines = [
        
        '// Autogenerated by build_wikipedia_data.py',
        '// at ' + time_str,
        '',
        f'const {var_name} = ' + '{',
    ]


    wiki_page_name_list = get_election_wiki_page_name_list() + get_electoral_district_wiki_page_name_list()

    for wiki_page_name in wiki_page_name_list:
        log.debug(wiki_page_name)
        try:
            wiki = wikipediaapi.Wikipedia("lk_elections", "en")
            page = wiki.page(wiki_page_name)
            summary = clean(page.summary)
            lines.extend([
                '',
                '  // ' + wiki_page_name,
                f'  "{wiki_page_name}": {json.dumps(summary)},',
            ])
        except Exception as e:
            log.error(f'Error fetching {wiki_page_name}: {e}')


    lines.extend([
        '',
        '};',
        '',
        f'export default {var_name};',
    ])
    
    data_path = os.path.join('src', 'nonview', 'constants', f'{var_name}.js')
    File(data_path).write_lines(lines)
    log.info(f'Wrote {data_path}')

if __name__ == "__main__":
    main()