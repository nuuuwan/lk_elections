from gig import Ent, EntType


def get_electoral_district_wiki_page_name_list():
    ents = Ent.list_from_type(EntType.ED)
    wiki_page_name_list = []
    for ent in ents:
        name_snake = ent.name.replace(' ', '_')
        wiki_page_name = f'{name_snake}_Electoral_District'
        wiki_page_name_list.append(wiki_page_name)
    return wiki_page_name_list


def get_polling_division_wiki_page_name_list():
    ents = Ent.list_from_type(EntType.PD)
    wiki_page_name_list = []
    for ent in ents:
        name_snake = ent.name.replace(' ', '_')
        wiki_page_name = f'{name_snake}_Polling_Division'
        wiki_page_name_list.append(wiki_page_name)
    return wiki_page_name_list
