import json
import wikipedia
import os
from utils import File, Log
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

def main():
    page_to_summary = {}
    for election_type, date_str in ELECTION_LIST:
        year_str = date_str.split('-')[0]
        page_name = f'{year_str} Sri Lankan {election_type.title()} Election'
        log.debug(page_name)
        try:
            summary = wikipedia.summary(page_name)
            page_to_summary[page_name] = summary
        except Exception as e:
            log.error(f'Error fetching {page_name}: {e}')

    var_name = 'WIKIPEDIA_SUMMRY_IDX'
    lines = [f'const {var_name} = ' + json.dumps(page_to_summary, indent=2) + ';', f'export default {var_name};']
    data_path = os.path.join('src', 'nonview', 'constants', f'{var_name}.js')
    File(data_path).write_lines(lines)
    log.info(f'Wrote {data_path}')

if __name__ == "__main__":
    main()