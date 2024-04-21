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


def get_election_wiki_page_name_list():
    wiki_page_name_list = []
    for election_type, date_str in ELECTION_LIST:
        year_str = date_str.split('-')[0]
        wiki_page_name = (
            f'{year_str}_Sri_Lankan_{election_type.lower()}_election'
        )
        wiki_page_name_list.append(wiki_page_name)
    return wiki_page_name_list
