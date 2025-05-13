const main = document.body;

const block = document.createElement('div');
block.className = 'block';
main.append(block);

const header = document.createElement('div');
header.className = 'header';

const headerLogoContainer = document.createElement('div');
headerLogoContainer.className = 'headerLogoContainer';
header.append(headerLogoContainer);

const logoImage = document.createElement('img');
logoImage.src = 'components/imgs/contact-book 1 (Traced).png'; 
logoImage.alt = 'Logo';
logoImage.className = 'logoImage'; 
headerLogoContainer.append(logoImage);

const headertext = document.createElement('div');
headertext.className = 'headertext';
headertext.textContent = 'Книга контактов';
headerLogoContainer.append(headertext);

const buttonAddContacts = document.createElement('button');
buttonAddContacts.className = 'buttonAddContacts';
buttonAddContacts.textContent = 'Добавить контакт +';
header.append(buttonAddContacts);

const buttonGroups = document.createElement('button');
buttonGroups.className = 'buttonGroups';
buttonGroups.textContent = 'Группы';
header.append(buttonGroups);

block.append(header);

const groupsOverlay = document.createElement('div');
groupsOverlay.className = 'groupsOverlay';

const contactsOverlay = document.createElement('div');
contactsOverlay.className = 'contactsOverlay';

const contactsBlock = document.createElement('div');
contactsBlock.className = 'contactsBlock';
block.append(contactsBlock);

const groupsBlock = document.createElement('div');
groupsBlock.className = 'groupsBlock';
block.append(groupsBlock);

groupsOverlay.appendChild(groupsBlock);
document.body.appendChild(groupsOverlay);

contactsOverlay.appendChild(contactsBlock);
document.body.appendChild(contactsOverlay);


const groupsBlockHeader = document.createElement('div');
groupsBlockHeader.className = 'groupsBlockHeader';
groupsBlockHeader.textContent = 'Группы контактов';
groupsBlock.append(groupsBlockHeader);

const groupsBlockHeaderClose = document.createElement('button');
groupsBlockHeaderClose.className = 'groupsBlockHeaderClose';
groupsBlockHeader.append(groupsBlockHeaderClose);

const groupsBlockHeaderCloseImg =  document.createElement('img');
groupsBlockHeaderCloseImg.src = 'components/imgs/VectorX.svg'; 
groupsBlockHeaderCloseImg.alt = 'X';
groupsBlockHeaderCloseImg.className = 'groupsBlockHeaderClose'; 
groupsBlockHeaderClose.append(groupsBlockHeaderCloseImg);

const groupsBlockContent = document.createElement('div');
groupsBlockContent.className = 'groupsBlockContent';
groupsBlock.append(groupsBlockContent);

const groupsBlockGroupContainer = document.createElement('div');
groupsBlockGroupContainer.className = 'groupsBlockGroupContainer';
groupsBlockContent.append(groupsBlockGroupContainer);

function addGroup(name) { 
const groupsBlockGroup = document.createElement('div');
groupsBlockGroup.className = 'groupsBlockGroup';
groupsBlockGroupContainer.append(groupsBlockGroup);

const groupsBlockGroupName = document.createElement('input');
groupsBlockGroupName.className = 'groupsBlockGroupName';
groupsBlockGroupName.value = name;
groupsBlockGroupName.placeholder = "Введите название";
groupsBlockGroup.append(groupsBlockGroupName);

groupsBlockGroupName.addEventListener('focus', handleFocus);
groupsBlockGroupName.addEventListener('blur', handleBlur);
groupsBlockGroupName.oninput = saveGroups;

const groupsBlockGroupDeleteButton = document.createElement('div');
groupsBlockGroupDeleteButton.className = 'groupsBlockGroupDeleteButton';
groupsBlockGroup.append(groupsBlockGroupDeleteButton);

const groupsBlockGroupDeleteIcon =  document.createElement('img');
groupsBlockGroupDeleteIcon.src = 'components/imgs/VectorBin.svg'; 
groupsBlockGroupDeleteIcon.alt = 'X';
groupsBlockGroupDeleteIcon.className = 'groupsBlockGroupDelete'; 
groupsBlockGroupDeleteButton.append(groupsBlockGroupDeleteIcon);

groupsBlockGroupDeleteButton.onclick = () => {
    currentGroupName = name;
    groupsOverlay.style.display = 'none';
    openModal()
};
}

const modalOverlay = document.createElement('div');
modalOverlay.className = 'modalOverlay';
modalOverlay.style.display = 'none';
document.body.appendChild(modalOverlay);

const modal = document.createElement('div');
modal.className = 'modal';
modalOverlay.appendChild(modal);

const modalCloseButton = document.createElement('img');
modalCloseButton.src = 'components/imgs/VectorX.svg'; 
modalCloseButton.alt = 'X';
modalCloseButton.className = 'modalCloseButton';
modal.appendChild(modalCloseButton);


const modalHeader = document.createElement('div');
modalHeader.className = 'modalHeader';
modalHeader.textContent = 'Удалить группу?';
modal.appendChild(modalHeader);

const modalBody = document.createElement('div');
modalBody.className = 'modalBody';
modalBody.textContent = 'Удаление группы повлечет за собой удаление контактов, связанных с этой группой.';
modal.appendChild(modalBody);

const modalFooter = document.createElement('div');
modalFooter.className = 'modalFooter';
modal.appendChild(modalFooter);

const modalConfirmDeleteButton = document.createElement('button');
modalConfirmDeleteButton.className = 'modalConfirmDeleteButton';
modalConfirmDeleteButton.textContent = 'Да, удалить';
modalFooter.appendChild(modalConfirmDeleteButton);

const modalCancelButton = document.createElement('button');
modalCancelButton.className = 'modalCancelButton';
modalCancelButton.textContent = 'Отменить';
modalFooter.appendChild(modalCancelButton);

function openModal() {
    modalOverlay.style.display = 'flex';
}

function closeModal() {
    modalOverlay.style.display = 'none';
}
modalCloseButton.onclick = closeModal;
modalCancelButton.onclick = closeModal;

modalConfirmDeleteButton.onclick = () => {
    deleteGroup(currentGroupName); 
    closeModal();
};

let currentGroupName; 

function deleteGroup(name) {

    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    const updatedGroups = groups.filter(group => group !== name);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
    
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const updatedContacts = contacts.filter(contact => contact.group !== name);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
 
    const groupsBlockGroupContainer = document.querySelector('.groupsBlockGroupContainer');
    const groupElements = Array.from(groupsBlockGroupContainer.children);

    const groupToDelete = groupElements.find(group => {
        const input = group.querySelector('input');
        return input && input.value === name;
    });

    if (groupToDelete) {
        groupsBlockGroupContainer.removeChild(groupToDelete);
    }

    
    updateBigMenu();
    updateDropdownMenu();
}




function updateDropdownMenu() {
    menu.innerHTML = ''; 
    const groups = JSON.parse(localStorage.getItem('groups')) || []; 
    groups.forEach(group => {
        const item = document.createElement('div'); 
        item.className = 'dropdownGroups-item';
        item.textContent = group;
        item.onclick = () => {
            toggleDropdownGroups.textContent = group; 
            dropdownGroups.classList.remove('open');
        };
        menu.appendChild(item);
    });
}

function loadGroups() {
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    groups.forEach(group => addGroup(group));
    updateDropdownMenu(); 
}

function saveGroups() {
    const groups = [];
    document.querySelectorAll('.groupsBlockGroupName').forEach(input => {
        groups.push(input.value);
    });
    localStorage.setItem('groups', JSON.stringify(groups));
    updateDropdownMenu(); 
}

const groupsBlockContentButtons = document.createElement('div');
groupsBlockContentButtons.className = 'groupsBlockContentButtons';
groupsBlockContent.append(groupsBlockContentButtons);

const groupsBlockAddButton = document.createElement('button');
groupsBlockAddButton.className = 'groupsBlockAddButton';
groupsBlockAddButton.textContent = 'Добавить';
groupsBlockContentButtons.append(groupsBlockAddButton);

const groupsBlockSaveButton = document.createElement('button');
groupsBlockSaveButton.className = 'groupsBlockSaveButton';
groupsBlockSaveButton.textContent = 'Сохранить';
groupsBlockContentButtons.append(groupsBlockSaveButton);

groupsBlockSaveButton.onclick = () => {
    saveGroups();
    updateDropdownMenu();
}

buttonGroups.onclick = () => {
    groupsOverlay.style.display = 'flex';
  };

  buttonAddContacts.onclick = () => {
    contactsOverlay.style.display = 'flex';
  };

  groupsBlockAddButton.onclick = () => {
    addGroup(''); 
};

const closeOverlay = groupsBlockHeader.querySelector('.groupsBlockHeaderClose');
closeOverlay.onclick = () => {
    groupsOverlay.style.display = 'none';

};

const contactsBlockHeader = document.createElement('div');
contactsBlockHeader.className = 'contactsBlockHeader';
contactsBlockHeader.textContent = 'Добавление контакта';
contactsBlock.append(contactsBlockHeader);

const contactsBlockHeaderClose = document.createElement('button');
contactsBlockHeaderClose.className = 'contactsBlockHeaderClose';
contactsBlockHeader.append(contactsBlockHeaderClose);

const contactsBlockHeaderCloseImg =  document.createElement('img');
contactsBlockHeaderCloseImg.src = 'components/imgs/VectorX.svg'; 
contactsBlockHeaderCloseImg.alt = 'X';
contactsBlockHeaderCloseImg.className = 'contactsBlockHeaderClose'; 
contactsBlockHeaderClose.append(contactsBlockHeaderCloseImg);

const contactsBlockContent = document.createElement('div');
contactsBlockContent.className = 'contactsBlockContent';
contactsBlock.append(contactsBlockContent);

const contactsBlockContainer = document.createElement('div');
contactsBlockContainer.className = 'contactsBlockContainer';
contactsBlockContent.append(contactsBlockContainer);

const contactsBlockContentButtons = document.createElement('div');
contactsBlockContentButtons.className = 'contactsBlockContentButtons';
contactsBlockContent.append(contactsBlockContentButtons);

const contactsBlockSaveButton = document.createElement('button');
contactsBlockSaveButton.className = 'contactsBlockSaveButton';
contactsBlockSaveButton.textContent = 'Сохранить';
contactsBlockContentButtons.append(contactsBlockSaveButton);

const contactsBlockName = document.createElement('input');
contactsBlockName.className = 'contactsBlockName';
contactsBlockName.type="text";
contactsBlockName.placeholder = "Введите ФИО";
contactsBlockContainer.append(contactsBlockName);

const contactsBlockNameError = document.createElement('div');
contactsBlockNameError.className = 'error-message';
contactsBlockNameError.textContent = 'Поле является обязательным';
contactsBlockContainer.appendChild(contactsBlockNameError);

const contactsBlockNumber = document.createElement('input');
contactsBlockNumber.className = 'contactsBlockNumber';
contactsBlockNumber.type="number";
contactsBlockNumber.placeholder = "Введите Номер";
contactsBlockContainer.append(contactsBlockNumber);

const contactsBlockNumberError = document.createElement('div');
contactsBlockNumberError.className = 'error-message';
contactsBlockNumberError.textContent = 'Поле является обязательным';
contactsBlockContainer.appendChild(contactsBlockNumberError);

const dropdownGroups = document.createElement('div'); 
dropdownGroups.className = 'dropdownGroups';

const toggleDropdownGroups = document.createElement('button'); 
toggleDropdownGroups.className = 'dropdownGroups-toggle';
toggleDropdownGroups.textContent = 'Выберите группу';

const menu = document.createElement('div');
menu.className = 'dropdownGroups-menu';

const groups =  JSON.parse(localStorage.getItem('groups')) || [];
groups.forEach(group => {
    const item = document.createElement('div'); 
    item.className = 'dropdownGroups-item';
    item.textContent = group;
    menu.appendChild(item);
});

dropdownGroups.appendChild(toggleDropdownGroups);
dropdownGroups.appendChild(menu);
contactsBlockContainer.appendChild(dropdownGroups); 

toggleDropdownGroups.onclick = () => {
    dropdownGroups.classList.toggle('open');
};

contactsBlock.addEventListener('click', (e) => {
    if (!dropdownGroups.contains(e.target) && !toggleDropdownGroups.contains(e.target)) {
    dropdownGroups.classList.remove('open');
    }
});

const closeNameOverlay = contactsBlockHeader.querySelector('.contactsBlockHeaderClose');
closeNameOverlay.onclick = () => {
    contactsOverlay.style.display = 'none';
};

const bigmenu = document.createElement('div');
bigmenu.className = 'bigmenu';
block.append(bigmenu);

function updateBigMenu() {
    bigmenu.innerHTML = ''; 
    const contacts = JSON.parse(localStorage.getItem('contacts')) || []; 

     if (contacts.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = 'emptyMessage';
        emptyMessage.textContent = 'Список контактов пуст';
        bigmenu.appendChild(emptyMessage);
        return; 
    }

    const groups = {};

    contacts.forEach(contact => {
        if (!groups[contact.group]) {
            groups[contact.group] = [];
        }
        groups[contact.group].push(contact);
    });

    for (const group in groups) {
        const groupContainer = document.createElement('div');
        groupContainer.className = 'groupContainer';
        bigmenu.appendChild(groupContainer);

        const groupHeader = document.createElement('div');
        groupHeader.className = 'groupHeader';
        groupHeader.textContent = group;
        groupContainer.appendChild(groupHeader);

    const contactDropdown = document.createElement('ul');
    contactDropdown.className = 'contactDropdown';
    groupContainer.appendChild(contactDropdown);

    groups[group].forEach(contact => {
        const bigmenuContactItem = document.createElement('li');
        bigmenuContactItem.className = 'bigmenuContactItem';
  
    const contactInfoName = document.createElement('div');
    contactInfoName.className = 'contactInfoName';
    contactInfoName.textContent = `${contact.name}`;
    bigmenuContactItem.appendChild(contactInfoName);

    const contactInfoNumber = document.createElement('div');
    contactInfoNumber.className = 'contactInfoNumber';
    contactInfoNumber.textContent = '+' + `${contact.number}`;
    bigmenuContactItem.appendChild(contactInfoNumber);

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttonContainer';

    const editButton = document.createElement('img');
    editButton.src = 'components/imgs/VectorEdit.svg';
    editButton.className = 'editButton';
    editButton.onclick = () => {
        contactsBlockName.value = contact.name;
        contactsBlockNumber.value = contact.number;
        toggleDropdownGroups.textContent = contact.group;
        dropdownGroups.classList.remove('open');
        contactsOverlay.style.display = 'flex';
    };

    const deleteButton = document.createElement('img');
    deleteButton.src = 'components/imgs/VectorBin.svg';
    deleteButton.className = 'deleteButton';
    deleteButton.onclick = () => {
        const updatedContacts = contacts.filter(c => c !== contact);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        updateBigMenu();
    };

    bigmenuContactItem.appendChild(buttonContainer);
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
    contactDropdown.appendChild(bigmenuContactItem);
});

groupHeader.onclick = () => {
    contactDropdown.classList.toggle('open');
    groupHeader.classList.toggle('active', contactDropdown.classList.contains('open'));
};

document.addEventListener('click', (event) => {
    const isClickInside = bigmenu.contains(event.target);
    if (!isClickInside) {
        const dropdowns = document.querySelectorAll('.bigmenu-contact-dropdown');
        dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    }
});
    }
}

contactsBlockSaveButton.onclick = () => {
    const name = contactsBlockName.value.trim();
    const number = contactsBlockNumber.value.trim();
    const group = toggleDropdownGroups.textContent;

    contactsBlockName.classList.remove('error');
    contactsBlockNumber.classList.remove('error');
    contactsBlockNameError.style.display = 'none'; 
    contactsBlockNumberError.style.display = 'none';

    let hasError = false;

    if (name === '') {
        contactsBlockName.classList.add('error');
        contactsBlockNameError.style.display = 'block'; 
        hasError = true;
    }

    if (number === '') {
        contactsBlockNumber.classList.add('error');
        contactsBlockNumberError.style.display = 'block'; 
        hasError = true;
    }

    if (hasError) {
        return; 
    }
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const existingContactIndex = contacts.findIndex(c => c.name ===name && c.number === '+' + number);

    if (existingContactIndex !== -1) {
      
        contacts[existingContactIndex] = { name, number, group };
    } else {
        
        contacts.push({ name, number, group });
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
    updateBigMenu();

 
    contactsBlockName.value = '';
    contactsBlockNumber.value = '';
    toggleDropdownGroups.textContent = 'Выберите группу'; 
    dropdownGroups.classList.remove('open');
};

function handleFocus(event) {
    event.target.placeholder = ''; 
}

function handleBlur(event) {
    if (event.target === contactsBlockName) {
        event.target.placeholder = 'Введите ФИО'; 
    } else if (event.target === contactsBlockNumber) {
        event.target.placeholder = 'Введите Номер'; 
    } else if (event.target === groupsBlockGroupName) {
        event.target.placeholder = 'Введите название'; 
    }
    
}

contactsBlockName.addEventListener('focus', handleFocus);
contactsBlockName.addEventListener('blur', handleBlur);

contactsBlockNumber.addEventListener('focus', handleFocus);
contactsBlockNumber.addEventListener('blur', handleBlur);

loadGroups();
updateBigMenu();