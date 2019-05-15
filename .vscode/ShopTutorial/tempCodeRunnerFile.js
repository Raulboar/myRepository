fs.writeFile(
    'items.json',
    JSON.stringify(items, null, 4),
    (err) => {
        if (err) console.log(err);

        console.log('The file has been saved!');
    }
);